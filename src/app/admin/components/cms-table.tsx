"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminModule } from "../admin-cms-data";
import CmsFormModal from "./cms-form-modal";
import { Plus, Edit, Trash2, GripVertical, Image as ImageIcon } from "lucide-react";
import { deleteCmsRecord, updateCmsRecordsOrder } from "../actions";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type SafeAdminModule = Omit<AdminModule, "icon">;

function SortableRow({ row, module, onEdit, onDelete, isPending }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: isDragging ? ("relative" as const) : ("static" as const),
    zIndex: isDragging ? 50 : "auto",
    boxShadow: isDragging ? "0 5px 15px rgba(0,0,0,0.08)" : "none",
  };

  return (
    <tr ref={setNodeRef} style={style} className={`bg-white transition-colors ${isDragging ? "opacity-75" : "hover:bg-gray-50"}`}>
      <td className="px-2 py-3 w-10 text-center">
        <button
          {...attributes}
          {...listeners}
          className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing p-1"
          title="Kéo để sắp xếp"
        >
          <GripVertical className="w-4 h-4" />
        </button>
      </td>
      
      {/* Cột hiển thị hình thu nhỏ đầu tiên nếu module có chứa file/ảnh */}
      {module.fields.some((f: any) => f.name.includes("image") || f.type === "file") && (
        <td className="px-4 py-3 w-20 text-center">
          {(() => {
            const imageField = module.fields.find((f: any) => f.name.includes("image") || f.type === "file");
            if (!imageField) return null;
            const imageUrl = row[imageField.name];
            const isImage = imageUrl && (imageField.name.includes("image") || imageUrl.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i));
            
            let thumbnailSrc: string | null = null;
            
            // Handle array or JSON of images
            if (Array.isArray(imageUrl) && imageUrl.length > 0) {
              thumbnailSrc = typeof imageUrl[0] === "string" ? imageUrl[0] : null;
            } else if (typeof imageUrl === "string" && imageUrl.startsWith("[")) {
              try {
                const parsed = JSON.parse(imageUrl);
                thumbnailSrc = (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "string") ? parsed[0] : null;
              } catch (e) {
                // ignore
              }
            } else if (typeof imageUrl === "string") {
              thumbnailSrc = imageUrl;
            }
            
            if (thumbnailSrc && (imageField.name.includes("image") || thumbnailSrc.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i))) {
              return (
                <div className="w-[60px] h-[60px] rounded-md overflow-hidden bg-gray-100 border border-gray-200 shadow-sm flex-shrink-0 flex items-center justify-center">
                  <img src={thumbnailSrc} alt="thumbnail" className="w-full h-full object-cover" />
                </div>
              );
            }
            return (
              <div className="w-[60px] h-[60px] rounded-md overflow-hidden bg-gray-100 border border-gray-200 shadow-sm flex-shrink-0 flex items-center justify-center">
                 <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
            );
          })()}
        </td>
      )}

      {module.fields
        .filter((f: any) => f.type !== "textarea")
        .slice(0, 4)
        .map((field: any, index: number) => {
          const isChild =
            row.level == "1" || row.level === 1 || (row.parent_id && row.parent_id !== "0");
          const isFirstTextCol = index === 0;

          return (
          <td key={field.name} className={`px-4 py-3 ${isFirstTextCol && isChild ? "pl-10 relative" : ""}`}>
            {isFirstTextCol && isChild && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 border-b-2 border-l-2 border-gray-300 rounded-bl-md" />
            )}
            {field.type === "file" || field.type === "url" ? (
              row[field.name] ? (
                  <a
                    href={row[field.name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline truncate max-w-[150px] inline-block"
                  >
                    Xem liên kết
                  </a>
              ) : (
                <span className="text-gray-400">-</span>
              )
            ) : typeof row[field.name] === "boolean" ? (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${row[field.name] ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
              >
                {row[field.name] ? "Có" : "Không"}
              </span>
            ) : (
              <span className="truncate max-w-[200px] inline-block text-gray-700">
                {row[field.name]?.toString() || "-"}
              </span>
            )}
          </td>
        )})}
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-1">
          <button
            onClick={() => onEdit(row)}
            className="text-gray-500 hover:text-blue-600 p-1.5 rounded-md hover:bg-blue-50 transition-colors"
            title="Chỉnh sửa"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(row.id)}
            disabled={isPending}
            className="text-gray-500 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50"
            title="Xóa"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function CmsTable({
  module,
  data,
}: {
  module: SafeAdminModule;
  data: any[];
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any | null>(null);
  const [items, setItems] = useState<any[]>(data || []);

  useEffect(() => {
    setItems(data || []);
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      
      // Update local state immediately
      setItems(newItems);
      
      // Update server state inside transition
      startTransition(async () => {
        try {
          await updateCmsRecordsOrder(
            module.table,
            newItems.map((i) => i.id)
          );
        } catch (error: any) {
          alert(error.message || "Lỗi cập nhật thứ tự");
        }
      });
    }
  };


  const handleAddNew = () => {
    if (module.key === "products") {
      router.push("/admin/products/new");
      return;
    }
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    if (module.key === "products") {
      router.push(`/admin/products/${record.id}`);
      return;
    }
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string | number) => {
    if (confirm("Bạn có chắc chắn muốn xóa bản ghi này? Hành động này không thể hoàn tác.")) {
      startTransition(async () => {
        try {
          await deleteCmsRecord(module.table, id);
        } catch (error: any) {
          alert(error.message || "Đã xảy ra lỗi khi xóa bản ghi.");
        }
      });
    }
  };

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-xl overflow-hidden flex flex-col mb-8 shadow-sm">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            {module.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{module.subtitle}</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Thêm mới
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="w-full">
          <table className="w-full text-sm text-left bg-white">
            <thead className="text-xs text-gray-500 bg-gray-100 uppercase border-b border-gray-200">
              <tr>
                <th className="px-2 py-3 w-10"></th>
                {/* Header hiển thị cột Thumbnail (nếu có) */}
                {module.fields.some((f: any) => f.name.includes("image") || f.type === "file") && (
                  <th className="px-4 py-3 font-medium w-20 text-center">Hình ảnh</th>
                )}
                {module.fields
                  .filter((f) => f.type !== "textarea")
                  .slice(0, 4)
                  .map((field) => (
                    <th key={field.name} className="px-4 py-3 font-medium">
                      {field.label}
                    </th>
                  ))}
                <th className="px-4 py-3 font-medium text-right text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 relative">
              <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {items && items.length > 0 ? (
                  items.map((row: any) => (
                    <SortableRow
                      key={row.id}
                      row={row}
                      module={module}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      isPending={isPending}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={module.fields.length + 2}
                      className="px-4 py-8 text-center text-gray-500 bg-white"
                    >
                      Chưa có dữ liệu. Hãy thêm bản ghi mới.
                    </td>
                  </tr>
                )}
              </SortableContext>
            </tbody>
          </table>
        </div>
      </DndContext>

      {isModalOpen && (
        <CmsFormModal
          module={module}
          initialData={editingRecord}
          onClose={handleCloseModal}
          allData={items}
        />
      )}
    </div>
  );
}