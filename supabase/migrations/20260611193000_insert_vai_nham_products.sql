DO $$
DECLARE
    v_category_id UUID;
BEGIN
    -- Tìm ID của danh mục "VẢI NHÁM" hoặc "Vải nhám"
    SELECT id INTO v_category_id FROM cms_product_categories WHERE name ILIKE '%Vải Nhám%' LIMIT 1;

    -- Nếu chưa có danh mục VẢI NHÁM, thì tạo mới
    IF v_category_id IS NULL THEN
        INSERT INTO cms_product_categories (name, slug, level, status)
        VALUES ('Vải Nhám', 'vai-nham', '1', 'published')
        RETURNING id INTO v_category_id;
    END IF;

    -- Xoá các sản phẩm mẫu vải nhám cũ nếu có (dựa trên SKU) để tránh trùng lặp nếu chạy nhiều lần
    DELETE FROM cms_products WHERE category_id = v_category_id AND sku LIKE 'VN-MAMP-%';

    -- Insert 15 sản phẩm mẫu
    INSERT INTO cms_products (name, sku, slug, category_id, status, price, unit, short_description, description, features, specifications)
    VALUES
    ('Vải nhám tờ P60', 'VN-MAMP-01', 'vai-nham-to-p60', v_category_id, 'published', 5000, 'Tờ', 'Vải nhám tờ độ nhám P60 dùng cho chà nhám thô', 'Vải nhám tờ độ nhám P60 là lựa chọn hoàn hảo cho bề mặt gỗ cứng và kim loại, giúp loại bỏ khuyết điểm nhanh chóng.', 'Hạt cát nhôm oxit siêu cứng, đế vải mềm linh hoạt', 'Kích thước: 230mm x 280mm\nĐộ nhám: P60'),
    
    ('Vải nhám tờ P80', 'VN-MAMP-02', 'vai-nham-to-p80', v_category_id, 'published', 5000, 'Tờ', 'Vải nhám tờ độ nhám P80', 'Vải nhám tờ độ nhám P80 dùng cho chà nhám thô với tốc độ cắt gọt nhanh.', 'Hạt cát nhôm oxit siêu cứng', 'Kích thước: 230mm x 280mm\nĐộ nhám: P80'),
    
    ('Vải nhám tờ P100', 'VN-MAMP-03', 'vai-nham-to-p100', v_category_id, 'published', 5500, 'Tờ', 'Vải nhám tờ độ nhám P100 chuyên dụng đánh bóng vừa', 'Với độ nhám P100, sản phẩm hỗ trợ đánh bóng trung bình trước khi sơn lót.', 'Bề mặt phủ lớp chống bám mạt', 'Kích thước: 230mm x 280mm\nĐộ nhám: P100'),
    
    ('Vải nhám tờ P120', 'VN-MAMP-04', 'vai-nham-to-p120', v_category_id, 'published', 5500, 'Tờ', 'Vải nhám tờ độ nhám P120 cho bề mặt trung bình', 'Sản phẩm được tối ưu cho việc chà nhám giữa các lớp sơn lót.', 'Lớp vải cotton chịu nhiệt độ cao', 'Kích thước: 230mm x 280mm\nĐộ nhám: P120'),
    
    ('Vải nhám tờ P150', 'VN-MAMP-05', 'vai-nham-to-p150', v_category_id, 'published', 6000, 'Tờ', 'Vải nhám tờ độ nhám P150', 'Mang lại bề mặt trung bình mịn cho các loại gỗ ép và MDF.', 'Công nghệ dán tĩnh điện giúp hạt cát bám chắc', 'Kích thước: 230mm x 280mm\nĐộ nhám: P150'),
    
    ('Vải nhám tờ P180', 'VN-MAMP-06', 'vai-nham-to-p180', v_category_id, 'published', 6000, 'Tờ', 'Vải nhám tờ độ nhám P180 dùng chà nhám tinh', 'Ứng dụng trong việc làm mịn bề mặt lần cuối trước khi phủ bóng.', 'Lớp lót chống thấm nước', 'Kích thước: 230mm x 280mm\nĐộ nhám: P180'),
    
    ('Vải nhám tờ P240', 'VN-MAMP-07', 'vai-nham-to-p240', v_category_id, 'published', 6500, 'Tờ', 'Vải nhám tờ độ nhám P240 đánh bóng bề mặt gỗ', 'Sản phẩm giúp bề mặt đạt độ hoàn thiện cao, thích hợp gỗ tự nhiên.', 'Đế vải mềm mại, dễ xé nhỏ', 'Kích thước: 230mm x 280mm\nĐộ nhám: P240'),
    
    ('Vải nhám tờ P320', 'VN-MAMP-08', 'vai-nham-to-p320', v_category_id, 'published', 6500, 'Tờ', 'Vải nhám tờ độ nhám P320 chuẩn bị cho sơn', 'Chuẩn bị bề mặt siêu mịn, không để lại vết xước lớn sau khi chà.', 'Hạt mài Silicon Carbide', 'Kích thước: 230mm x 280mm\nĐộ nhám: P320'),
    
    ('Vải nhám tờ P400', 'VN-MAMP-09', 'vai-nham-to-p400', v_category_id, 'published', 7000, 'Tờ', 'Vải nhám tờ độ nhám P400 độ mịn cao', 'Độ mịn hoàn hảo dùng trong sửa chữa ô tô và kim loại màu.', 'Thích hợp cả chà ướt và chà khô', 'Kích thước: 230mm x 280mm\nĐộ nhám: P400'),
    
    ('Vải nhám cuộn 100mm P60', 'VN-MAMP-10', 'vai-nham-cuon-100mm-p60', v_category_id, 'published', 150000, 'Cuộn', 'Vải nhám cuộn P60 rộng 100mm', 'Vải nhám dạng cuộn dùng cho máy chà nhám rung.', 'Cấu trúc dai, không dễ đứt rách khi hoạt động với cường độ cao', 'Kích thước: 100mm x 50m\nĐộ nhám: P60'),
    
    ('Vải nhám cuộn 100mm P120', 'VN-MAMP-11', 'vai-nham-cuon-100mm-p120', v_category_id, 'published', 150000, 'Cuộn', 'Vải nhám cuộn P120 rộng 100mm', 'Tối ưu hoá cho quy trình sản xuất dây chuyền gỗ nội thất.', 'Độ bền vượt trội', 'Kích thước: 100mm x 50m\nĐộ nhám: P120'),
    
    ('Vải nhám cuộn 100mm P240', 'VN-MAMP-12', 'vai-nham-cuon-100mm-p240', v_category_id, 'published', 160000, 'Cuộn', 'Vải nhám cuộn P240 rộng 100mm', 'Sản phẩm cuộn dùng cho công đoạn chà mịn.', 'Dễ dàng cắt theo kích thước máy', 'Kích thước: 100mm x 50m\nĐộ nhám: P240'),
    
    ('Vải nhám vòng 100x610mm P80', 'VN-MAMP-13', 'vai-nham-vong-100x610mm-p80', v_category_id, 'published', 25000, 'Vòng', 'Vải nhám vòng kích thước 100x610mm P80', 'Nhám vòng (Belt) dùng cho các loại máy mài đai, tốc độ mài mòn nhanh.', 'Mối nối keo chắc chắn, chịu lực vặn xoắn', 'Kích thước: 100mm x 610mm\nĐộ nhám: P80'),
    
    ('Vải nhám vòng 100x610mm P120', 'VN-MAMP-14', 'vai-nham-vong-100x610mm-p120', v_category_id, 'published', 25000, 'Vòng', 'Vải nhám vòng kích thước 100x610mm P120', 'Ứng dụng mài phá trung bình trong ngành mộc và cơ khí.', 'Chống ma sát nóng máy', 'Kích thước: 100mm x 610mm\nĐộ nhám: P120'),
    
    ('Vải nhám đai 50x2100mm P180', 'VN-MAMP-15', 'vai-nham-dai-50x2100mm-p180', v_category_id, 'published', 45000, 'Sợi', 'Vải nhám đai kích thước 50x2100mm P180', 'Nhám đai chuyên dụng làm nhẵn mép, góc hẹp trên kim loại hoặc gỗ.', 'Lớp phủ giải nhiệt tốt', 'Kích thước: 50mm x 2100mm\nĐộ nhám: P180');

END $$;