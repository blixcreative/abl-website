const fs = require('fs');
const path = require('path');

const imgPath = path.join(process.cwd(), 'public/images/product-3.png');
const imgBuffer = fs.readFileSync(imgPath);
const base64Str = 'data:image/png;base64,' + imgBuffer.toString('base64');

const sql = `DO $$
DECLARE
    v_category_id UUID;
BEGIN
    SELECT id INTO v_category_id FROM cms_product_categories WHERE name ILIKE '%Vải Nhám%' LIMIT 1;
    
    IF v_category_id IS NOT NULL THEN
        UPDATE cms_products 
        SET image_base64 = '${base64Str}', images = '["${base64Str}"]'::jsonb 
        WHERE category_id = v_category_id AND sku LIKE 'VN-MAMP-%';
    END IF;
END $$;`;

fs.writeFileSync(path.join(process.cwd(), 'supabase/migrations/20260611193100_update_vai_nham_images.sql'), sql);
console.log('Successfully created migration file');