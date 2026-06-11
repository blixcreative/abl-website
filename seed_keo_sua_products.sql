-- TÌM CATEGORY ID CỦA "KEO SỮA" (Sẽ trả về NULL nếu chưa tạo danh mục này)
-- CHẠY SCRIPT NÀY TRONG SUPABASE SQL EDITOR

DO $$ 
DECLARE
  v_category_id UUID;
BEGIN
  -- Lấy ID của danh mục "Keo Sữa"
  SELECT id INTO v_category_id 
  FROM cms_product_categories 
  WHERE name ILIKE '%Keo sữa%' 
  LIMIT 1;

  IF v_category_id IS NULL THEN
    RAISE NOTICE 'Không tìm thấy danh mục nào có chữ "Keo Sữa". Vui lòng tạo danh mục trước!';
    -- Bạn có thể comment dòng RAISE EXCEPTION lại nếu muốn nó insert mà không cần category
    -- RAISE EXCEPTION 'Category not found'; 
  END IF;

  -- Bắt đầu thêm 10 sản phẩm
  INSERT INTO cms_products (
    sku, 
    name, 
    slug, 
    category_id, 
    short_description, 
    description, 
    features, 
    specifications, 
    price, 
    unit, 
    status,
    is_featured,
    images
  )
  VALUES 
  (
    'KS-001', 'Keo Sữa Dán Gỗ Công Nghiệp A1', 'keo-sua-dan-go-cong-nghiep-a1', v_category_id,
    'Keo sữa dán gỗ chuyên dụng với độ bám dính cực cao, phù hợp cho sản xuất nội thất và thi công gỗ công nghiệp.',
    'Sản phẩm Keo Sữa Dán Gỗ Công Nghiệp A1 được sản xuất trên dây chuyền công nghệ hiện đại, đáp ứng các tiêu chuẩn khắt khe nhất của ngành gỗ. Đặc biệt hiệu quả khi sử dụng cho các loại gỗ ép, MDF, HDF và gỗ tự nhiên.',
    '- Độ bám dính cực kỳ mạnh mẽ trên nhiều bề mặt gỗ' || E'\n' || '- Thân thiện với môi trường, hàm lượng VOC cực thấp' || E'\n' || '- Thời gian khô bề mặt nhanh, giúp tăng tốc độ thi công' || E'\n' || '- Khả năng chịu lực cắt và lực kéo rất tốt' || E'\n' || '- Dễ dàng sử dụng, có thể pha loãng hoặc dùng trực tiếp',
    '- Trạng thái: Lỏng sệt' || E'\n' || '- Màu sắc: Trắng sữa (trong suốt khi khô)' || E'\n' || '- Độ nhớt: 12,000 - 15,000 cps' || E'\n' || '- Thời gian khô bề mặt: 10 - 15 phút' || E'\n' || '- Hạn sử dụng: 12 tháng kể từ ngày sản xuất',
    150000, 'Thùng 5kg', 'published', false, '[]'::jsonb
  ),
  (
    'KS-002', 'Keo Sữa Đa Năng Cao Cấp A2', 'keo-sua-da-nang-cao-cap-a2', v_category_id,
    'Keo sữa đa năng dùng cho dán giấy, thùng carton, bao bì, đồ thủ công mỹ nghệ.',
    'Keo Sữa Đa Năng Cao Cấp A2 là giải pháp hoàn hảo cho ngành công nghiệp bao bì và làm đồ thủ công mỹ nghệ. Lớp keo mỏng nhưng mang lại độ chắc chắn vượt trội.',
    '- Phù hợp cho đa dạng các loại vật liệu: giấy, carton, vải' || E'\n' || '- Hoàn toàn không chứa các hóa chất độc hại' || E'\n' || '- Tốc độ khô cực nhanh, phù hợp cho dây chuyền tự động' || E'\n' || '- Không làm ố vàng bề mặt vật liệu sau thời gian dài' || E'\n' || '- Dễ dàng làm sạch bằng nước khi keo chưa khô',
    '- Trạng thái: Dung dịch đồng nhất' || E'\n' || '- Màu sắc: Trắng đục' || E'\n' || '- Độ nhớt: 8,000 - 10,000 cps' || E'\n' || '- Thời gian khô bề mặt: 5 - 10 phút' || E'\n' || '- Hạn sử dụng: 24 tháng (bảo quản nơi thoáng mát)',
    45000, 'Chai 1kg', 'published', true, '[]'::jsonb
  ),
  (
    'KS-003', 'Keo Sữa Dán Giấy Tường A3', 'keo-sua-dan-giay-tuong-a3', v_category_id,
    'Sản phẩm keo dán chuyên dụng cho giấy dán tường, độ phủ cao và chống bong tróc.',
    'Giải quyết triệt để các vấn đề phồng rộp, bong tróc góc cạnh khi thi công giấy dán tường. Khả năng kháng ẩm nhẹ giúp giấy bám chặt vào tường.',
    '- Chống bong tróc các mép giấy sau khi thi công' || E'\n' || '- Kháng khuẩn và chống nấm mốc bề mặt' || E'\n' || '- Độ phủ rộng, giúp tiết kiệm keo tối đa' || E'\n' || '- Cho phép điều chỉnh vị trí giấy trong 5 phút đầu' || E'\n' || '- Không để lại mùi khó chịu trong phòng kín',
    '- Trạng thái: Lỏng sệt' || E'\n' || '- Màu sắc: Trắng sữa' || E'\n' || '- Độ pH: 6.0 - 7.5' || E'\n' || '- Tỷ lệ pha nước: 1:1 hoặc 1:2' || E'\n' || '- Định mức tiêu hao: 1kg/10m2',
    55000, 'Túi 1kg', 'published', false, '[]'::jsonb
  ),
  (
    'KS-004', 'Keo Sữa Chống Thấm W4', 'keo-sua-chong-tham-w4', v_category_id,
    'Keo sữa có khả năng kháng nước và chống thấm nhẹ, dùng trong môi trường có độ ẩm cao.',
    'Keo sữa hệ nước với công thức cải tiến bổ sung polymer kháng nước, ngăn ngừa sự thâm nhập của hơi ẩm làm giảm độ bám dính.',
    '- Kháng nước và chống ẩm cực kỳ hiệu quả' || E'\n' || '- Phù hợp cho cả nội thất và ngoại thất có mái che' || E'\n' || '- Khả năng chịu thay đổi nhiệt độ tốt' || E'\n' || '- Không bị nhũ hóa lại khi tiếp xúc với độ ẩm' || E'\n' || '- Thi công dễ dàng bằng cọ hoặc con lăn',
    '- Trạng thái: Sệt, mịn' || E'\n' || '- Thành phần: Polymer Acrylic' || E'\n' || '- Thời gian khô hoàn toàn: 24 giờ' || E'\n' || '- Khả năng chịu nhiệt: Lên đến 60 độ C' || E'\n' || '- Quy cách đóng gói: Thùng 18L',
    850000, 'Thùng 18L', 'published', false, '[]'::jsonb
  ),
  (
    'KS-005', 'Keo Sữa Đậm Đặc Siêu Dính V5', 'keo-sua-dam-dac-sieu-dinh-v5', v_category_id,
    'Keo sữa đậm đặc dùng cho các ứng dụng đòi hỏi độ kết dính cao và chịu tải trọng lớn.',
    'Hàm lượng rắn cao giúp tạo ra lớp màng keo cực kỳ vững chắc. Sản phẩm phù hợp cho việc ép ván, ghép gỗ khối tự nhiên.',
    '- Hàm lượng rắn (Solid content) cao trên 50%' || E'\n' || '- Lực liên kết siêu mạnh, thay thế đinh vít trong một số trường hợp' || E'\n' || '- Chống chịu được va đập và mài mòn' || E'\n' || '- Lớp keo linh hoạt không bị nứt nẻ do co ngót vật liệu' || E'\n' || '- Ít bị hao hụt thể tích sau khi khô',
    '- Trạng thái: Cực sệt' || E'\n' || '- Hàm lượng rắn: > 50%' || E'\n' || '- Lực kéo đứt: > 10 MPa' || E'\n' || '- Nhiệt độ thi công: 15 - 35 độ C' || E'\n' || '- Phương pháp thi công: Dao gạt, chổi',
    210000, 'Thùng 5kg', 'published', true, '[]'::jsonb
  ),
  (
    'KS-006', 'Keo Sữa Ngành Dệt May T6', 'keo-sua-nganh-det-may-t6', v_category_id,
    'Keo dùng trong ngành may mặc, dán mác, định hình cổ áo, cổ tay và làm bông gòn.',
    'Dòng keo đặc chủng dành riêng cho ngành công nghiệp dệt may, đảm bảo độ mềm mại cho vải sau khi dán và không gây kích ứng da.',
    '- Lớp keo mềm mại, không làm cứng hoặc gãy nếp vải' || E'\n' || '- Tuyệt đối an toàn cho người tiếp xúc trực tiếp (đạt chuẩn da liễu)' || E'\n' || '- Chịu được các hóa chất giặt tẩy thông thường' || E'\n' || '- Không bị bong tróc sau nhiều lần giặt máy' || E'\n' || '- Bám dính trên nhiều loại sợi (cotton, polyester, nilon)',
    '- Trạng thái: Lỏng' || E'\n' || '- Màu sắc: Trắng ngà' || E'\n' || '- Khả năng chịu nhiệt giặt: < 60 độ C' || E'\n' || '- Phương pháp: Xịt, nhúng, lăn' || E'\n' || '- Bảo quản: Tránh ánh nắng trực tiếp',
    120000, 'Can 5L', 'published', false, '[]'::jsonb
  ),
  (
    'KS-007', 'Keo Sữa Ghép Gỗ Chuyên Sâu G7', 'keo-sua-ghep-go-chuyen-sau-g7', v_category_id,
    'Ứng dụng đặc biệt cho ghép gỗ cao tần, ghép finger, ghép mộng chốt.',
    'Keo Sữa G7 được tối ưu hóa khả năng phản ứng với sóng cao tần (Radio Frequency), giúp keo khô và đóng rắn chỉ trong vài giây trên máy ép.',
    '- Tương thích hoàn hảo với máy ép gỗ cao tần' || E'\n' || '- Đóng rắn cực nhanh chỉ trong vòng 30 - 60 giây dưới máy ép' || E'\n' || '- Chống cháy xém tại mối ghép' || E'\n' || '- Đường keo vô hình sau khi chà nhám' || E'\n' || '- Tăng độ bền tổng thể của khối gỗ ghép',
    '- Trạng thái: Lỏng sệt' || E'\n' || '- Độ nhớt: 10,000 cps' || E'\n' || '- Độ pH: 4.5 - 5.5' || E'\n' || '- Tương thích RF: Có' || E'\n' || '- Đóng gói: Phuy 200kg',
    9500000, 'Phuy 200kg', 'published', false, '[]'::jsonb
  ),
  (
    'KS-008', 'Keo Sữa Ngành In Ấn P8', 'keo-sua-nganh-in-an-p8', v_category_id,
    'Keo dán gáy sách, bao bì carton cao cấp, hộp quà tặng.',
    'Dùng cho các máy dán tự động tốc độ cao. Màng keo dẻo dai giúp sách vở có thể mở phẳng 180 độ mà không gãy gáy.',
    '- Chống gãy gáy sách khi mở rộng' || E'\n' || '- Tốc độ khô đồng bộ với máy móc tự động cao' || E'\n' || '- Không bị kéo sợi khi dao cắt hoạt động' || E'\n' || '- Bề mặt màng keo láng mịn, thẩm mỹ cao' || E'\n' || '- Độ bám dính tốt trên cả màng OPP, BOPP',
    '- Trạng thái: Lỏng' || E'\n' || '- Màu sắc: Trắng, trong khi khô' || E'\n' || '- Tốc độ kết dính: Dưới 5 giây' || E'\n' || '- Máy áp dụng: Máy đóng sách tự động' || E'\n' || '- Hạn sử dụng: 6 tháng',
    800000, 'Thùng 20L', 'published', false, '[]'::jsonb
  ),
  (
    'KS-009', 'Keo Sữa Thợ Mộc Nhỏ Gọn N9', 'keo-sua-tho-moc-nho-gon-n9', v_category_id,
    'Dạng chai xịt nhỏ gọn, có vòi, chuyên dùng cho sửa chữa nhà cửa, DIY và mộc quy mô nhỏ.',
    'Thiết kế dạng chai xịt thông minh có nắp đậy kín, rất tiện lợi cho các dự án DIY tự làm tại nhà hoặc thợ mộc di động.',
    '- Thiết kế chai vòi xịt tiện dụng, kiểm soát lượng keo dễ dàng' || E'\n' || '- Có thể làm sạch bằng giẻ ướt dễ dàng' || E'\n' || '- An toàn để sử dụng cùng gia đình và trẻ nhỏ' || E'\n' || '- Nắp chống nghẹt keo thông minh' || E'\n' || '- Mùi thơm dịu nhẹ không gây khó chịu',
    '- Trạng thái: Sệt' || E'\n' || '- Khối lượng: 500g' || E'\n' || '- Thiết kế: Có vòi rót' || E'\n' || '- Thời gian khô: 15 phút kẹp giữ' || E'\n' || '- Thành phần: PVA',
    35000, 'Chai 500g', 'published', false, '[]'::jsonb
  ),
  (
    'KS-010', 'Keo Sữa Ngành Giày Da S10', 'keo-sua-nganh-giay-da-s10', v_category_id,
    'Keo sữa định hình, dán lót trong ngành công nghiệp sản xuất giày dép, túi xách da.',
    'Thay thế cho các loại keo dung môi truyền thống gây độc hại. Keo sữa S10 thân thiện môi trường nhưng vẫn đảm bảo độ bền chặt cho giày dép.',
    '- Giảm thiểu độc hại so với keo PU/Neoprene truyền thống' || E'\n' || '- Độ bám dính tuyệt vời trên da thật, da PU và vải lót' || E'\n' || '- Giữ phom dáng (định hình) cực tốt cho túi xách và giày dép' || E'\n' || '- Không làm ố hay biến màu vật liệu da nhạy cảm' || E'\n' || '- Tuân thủ các tiêu chuẩn xuất khẩu sang thị trường Châu Âu, Mỹ',
    '- Trạng thái: Lỏng sệt' || E'\n' || '- Đặc tính: Kháng mồ hôi' || E'\n' || '- Phương pháp: Chổi quét, lăn, phun' || E'\n' || '- Thời gian ráo keo: 20 phút' || E'\n' || '- Đóng gói: Can 20L',
    1200000, 'Can 20L', 'published', true, '[]'::jsonb
  );
  
  RAISE NOTICE 'Đã tạo xong 10 sản phẩm mẫu (dưới danh mục Keo Sữa)!';
END $$;