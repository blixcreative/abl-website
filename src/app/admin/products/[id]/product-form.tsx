"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveProduct } from "./product-actions";
import { Trash2, Plus, ArrowUp, ArrowDown, Save, X } from "lucide-react";

type ProductFormProps = {
  initialData: any;
  categories: any[];
  docs: any[];
  products: any[];
};

export default function ProductForm({ initialData, categories, docs, products }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    sku: initialData?.sku || "",
    slug: initialData?.slug || "",
    category_id: initialData?.category_id || "",
    price: initialData?.price || "",
    unit: initialData?.unit || "",
    is_featured: initialData?.is_featured || false,
    short_description: initialData?.short_description || "",
    description: initialData?.description || "",
    features: initialData?.features || "",
    specifications: initialData?.specifications || "",
    images: Array.isArray(initialData?.images) ? initialData.images : [],
    details: Array.isArray(initialData?.details) ? initialData.details : [],
    summaries: Array.isArray(initialData?.summaries) ? initialData.summaries : [],
    related_products: Array.isArray(initialData?.related_products) ? initialData.related_products : [],
    technical_documents: Array.isArray(initialData?.technical_documents) ? initialData.technical_documents : [],
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await saveProduct(initialData?.id || "new", formData);
        router.push("/admin/productsGroup?tab=products");
      } catch (error: any) {
        alert(error.message || "Đã xảy ra lỗi khi lưu sản phẩm");
      }
    });
  };

  // -- Quản lý mảng hình ảnh --
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const currentCount = formData.images.length;
    const availableSlots = 5 - currentCount;
    
    if (availableSlots <= 0) {
      alert("Chỉ được upload tối đa 5 hình ảnh cho 1 sản phẩm.");
      e.target.value = ""; // Reset input
      return;
    }
    
    const filesToProcess = Array.from(files).slice(0, availableSlots);
    if (files.length > availableSlots) {
       alert(`Bạn đã chọn quá số lượng. Hệ thống chỉ lấy thêm ${availableSlots} ảnh để đạt tối đa 5 ảnh.`);
    }

    const newImages: string[] = [];
    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];
      if (file.size > 0) {
        const buffer = await file.arrayBuffer();
        const base64String = Buffer.from(buffer).toString("base64");
        newImages.push(`data:${file.type};base64,${base64String}`);
      }
    }
    
    setFormData((prev) => {
      const totalImages = [...prev.images, ...newImages].slice(0, 5);
      return { ...prev, images: totalImages };
    });
    
    e.target.value = ""; // Reset input after processing
  };

  const moveItem = (arrayName: "images" | "details" | "summaries", index: number, direction: "up" | "down") => {
    setFormData((prev) => {
      const newArray = [...prev[arrayName]];
      if (direction === "up" && index > 0) {
        [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
      } else if (direction === "down" && index < newArray.length - 1) {
        [newArray[index + 1], newArray[index]] = [newArray[index], newArray[index + 1]];
      }
      return { ...prev, [arrayName]: newArray };
    });
  };

  const removeItem = (arrayName: "images" | "details" | "summaries", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_: any, i: number) => i !== index),
    }));
  };

  // -- Quản lý Details & Summaries --
  const addRepeaterItem = (arrayName: "details" | "summaries") => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], { title: "", content: "" }],
    }));
  };

  const updateRepeaterItem = (arrayName: "details" | "summaries", index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newArray = [...prev[arrayName]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  // -- Quản lý Đa chọn (Select Multi) --
  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: "related_products" | "technical_documents") => {
    const options = e.target.options;
    const selectedValues: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected && options[i].value !== "") {
        selectedValues.push(options[i].value);
      }
    }
    setFormData((prev) => ({ ...prev, [field]: selectedValues }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 pb-20">
      
      {/* Thông tin cơ bản */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-4 text-slate-800">Thông tin cơ bản</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Tên sản phẩm *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SKU *</label>
            <input required type="text" name="sku" value={formData.sku} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug (để trống tự tạo)</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Danh mục</label>
            <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full border p-2 rounded bg-white">
              <option value="">Chọn danh mục</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Giá</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Đơn vị (VD: cái, bộ)</label>
            <input type="text" name="unit" value={formData.unit} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div className="flex items-center gap-2 mt-6">
            <input type="checkbox" id="is_featured" name="is_featured" checked={formData.is_featured} onChange={handleChange} className="w-4 h-4" />
            <label htmlFor="is_featured" className="text-sm font-medium">Sản phẩm nổi bật</label>
          </div>
        </div>
      </div>

      {/* Hình ảnh */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800">Hình ảnh (Tối đa 5 ảnh)</h2>
          <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
            {formData.images.length}/5 ảnh
          </span>
        </div>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleImageFileChange} 
          disabled={formData.images.length >= 5}
          className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 cursor-pointer" 
        />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {formData.images.map((img: string, index: number) => (
            <div key={index} className="relative border rounded p-2 bg-gray-50 flex flex-col items-center">
              <img src={img} alt={`img-${index}`} className="w-full h-32 object-contain mb-2 bg-white border" />
              <div className="flex gap-2">
                <button type="button" onClick={() => moveItem("images", index, "up")} disabled={index === 0} className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30"><ArrowUp className="w-4 h-4"/></button>
                <button type="button" onClick={() => moveItem("images", index, "down")} disabled={index === formData.images.length - 1} className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30"><ArrowDown className="w-4 h-4"/></button>
                <button type="button" onClick={() => removeItem("images", index)} className="p-1 text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mô tả & Thông số */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-4 text-slate-800">Nội dung văn bản</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Mô tả ngắn</label>
            <textarea name="short_description" rows={3} value={formData.short_description} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mô tả chi tiết</label>
            <textarea name="description" rows={5} value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tính năng nổi bật</label>
            <textarea name="features" rows={5} value={formData.features} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Thông số kỹ thuật</label>
            <textarea name="specifications" rows={5} value={formData.specifications} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
        </div>
      </div>

      {/* Chi tiết sản phẩm (Repeater) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-800">Chi tiết sản phẩm (Repeater)</h2>
          <button type="button" onClick={() => addRepeaterItem("details")} className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium"><Plus className="w-4 h-4"/> Thêm mục</button>
        </div>
        <div className="space-y-4">
          {formData.details.map((item: any, index: number) => (
            <div key={index} className="flex gap-4 items-start border p-4 rounded bg-gray-50 relative group">
              <div className="flex-1 space-y-2">
                <input type="text" placeholder="Tiêu đề" value={item.title} onChange={(e) => updateRepeaterItem("details", index, "title", e.target.value)} className="w-full border p-2 rounded text-sm font-medium" />
                <textarea placeholder="Nội dung" value={item.content} rows={3} onChange={(e) => updateRepeaterItem("details", index, "content", e.target.value)} className="w-full border p-2 rounded text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                 <button type="button" onClick={() => moveItem("details", index, "up")} disabled={index === 0} className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30"><ArrowUp className="w-4 h-4"/></button>
                 <button type="button" onClick={() => moveItem("details", index, "down")} disabled={index === formData.details.length - 1} className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30"><ArrowDown className="w-4 h-4"/></button>
                 <button type="button" onClick={() => removeItem("details", index)} className="p-1 text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tóm tắt sản phẩm (Repeater) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-800">Tóm tắt sản phẩm (Repeater)</h2>
          <button type="button" onClick={() => addRepeaterItem("summaries")} className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium"><Plus className="w-4 h-4"/> Thêm mục</button>
        </div>
        <div className="space-y-4">
          {formData.summaries.map((item: any, index: number) => (
            <div key={index} className="flex gap-4 items-start border p-4 rounded bg-gray-50 relative group">
              <div className="flex-1 space-y-2">
                <input type="text" placeholder="Tiêu đề tóm tắt" value={item.title} onChange={(e) => updateRepeaterItem("summaries", index, "title", e.target.value)} className="w-full border p-2 rounded text-sm font-medium" />
                <textarea placeholder="Nội dung tóm tắt" value={item.content} rows={2} onChange={(e) => updateRepeaterItem("summaries", index, "content", e.target.value)} className="w-full border p-2 rounded text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                 <button type="button" onClick={() => moveItem("summaries", index, "up")} disabled={index === 0} className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30"><ArrowUp className="w-4 h-4"/></button>
                 <button type="button" onClick={() => moveItem("summaries", index, "down")} disabled={index === formData.summaries.length - 1} className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30"><ArrowDown className="w-4 h-4"/></button>
                 <button type="button" onClick={() => removeItem("summaries", index)} className="p-1 text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Liên kết */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-4 text-slate-800">Liên kết</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium mb-1">Sản phẩm tương tự (Giữ Ctrl/Cmd để chọn nhiều)</label>
            <select multiple size={6} value={formData.related_products} onChange={(e) => handleMultiSelectChange(e, "related_products")} className="w-full border p-2 rounded bg-white text-sm">
              <option value="" disabled className="text-gray-400">-- Chọn sản phẩm --</option>
              {products.filter(p => p.id !== initialData?.id).map((p) => (
                <option key={p.id} value={p.id}>{p.sku} - {p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tài liệu kỹ thuật (Giữ Ctrl/Cmd để chọn nhiều)</label>
            <select multiple size={6} value={formData.technical_documents} onChange={(e) => handleMultiSelectChange(e, "technical_documents")} className="w-full border p-2 rounded bg-white text-sm">
              <option value="" disabled className="text-gray-400">-- Chọn tài liệu --</option>
              {docs.map((d) => (
                <option key={d.id} value={d.id}>[{d.document_type}] {d.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-[280px] bg-white border-t p-4 flex justify-end gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <button type="button" onClick={() => router.push("/admin/productsGroup?tab=products")} className="px-6 py-2 border rounded-md font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          Hủy bỏ
        </button>
        <button type="submit" disabled={isPending} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50">
          <Save className="w-4 h-4" />
          {isPending ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>

    </form>
  );
}