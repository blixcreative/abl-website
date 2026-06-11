"use client";

import { useState, useRef, useEffect } from "react";
import { getDefaultValue } from "../admin-cms-data";
import { createCmsRecord, updateCmsRecord } from "../actions";
import { SafeAdminModule } from "./cms-table";

import { SearchableSelect } from "./searchable-select";

export default function CmsFormModal({
  module,
  initialData,
  onClose,
  allData = [],
}: {
  module: SafeAdminModule;
  initialData?: any; // Nếu có initialData => Edit, nếu không => Create
  onClose: () => void;
  allData?: any[];
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Focus trap and esc key handling for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsPending(true);

    try {
      if (initialData && initialData.id) {
        await updateCmsRecord(module.table, initialData.id, formData);
      } else {
        await createCmsRecord(module.table, formData);
      }
      onClose(); // Đóng modal sau khi thành công
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi lưu dữ liệu.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col relative my-8">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg z-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {initialData ? `Chỉnh sửa ${module.title}` : `Thêm mới ${module.title}`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            aria-label="Đóng"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm border border-red-200">
              {error}
            </div>
          )}

          <form action={handleSubmit} ref={formRef} className="flex flex-wrap gap-4">
            {module.fields.map((field) => {
              const defaultValue = initialData ? initialData[field.name] : getDefaultValue(field);

              return (
                <div
                  key={field.name}
                  className={`flex flex-col gap-1.5 ${field.fullWidth ? "w-full" : "w-full md:w-[calc(50%-0.5rem)]"}`}
                >
                  <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      placeholder={field.placeholder}
                      defaultValue={defaultValue || ""}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : field.name === "parent_id" ? (
                    <SearchableSelect
                      name={field.name}
                      defaultValue={defaultValue || ""}
                      options={[
                        { value: "", label: "-- Không có (Root) --" },
                        ...allData
                          .filter((d) => d.id !== initialData?.id)
                          .map((d) => ({
                            value: String(d.id),
                            label: String(d.name || d.title || d.label || d.id),
                          })),
                      ]}
                      required={field.required}
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      defaultValue={defaultValue || ""}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "file" ? (
                    <div>
                      {defaultValue && (defaultValue.startsWith("data:") || defaultValue.startsWith("http")) ? (
                        <div className="mb-2 w-[100px] h-[100px] border border-gray-200 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
                          {defaultValue.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) || defaultValue.startsWith("data:image/") ? (
                            <img src={defaultValue} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs text-gray-500">Có file đính kèm</span>
                          )}
                        </div>
                      ) : null}
                      <input
                        type="file"
                        id={field.name}
                        name={field.name}
                        required={field.required && !defaultValue} // Không bắt buộc nếu đã có data
                        accept={field.name.includes("image") ? "image/*" : undefined}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      placeholder={field.placeholder}
                      defaultValue={defaultValue || ""}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}

                  {field.help && (
                    <p className="text-xs text-gray-500 mt-0.5">{field.help}</p>
                  )}
                </div>
              );
            })}
          </form>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white rounded-b-lg">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => formRef.current?.requestSubmit()}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {isPending ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang tải tệp & lưu...
              </>
            ) : (
              "Lưu thay đổi"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}