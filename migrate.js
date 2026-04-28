import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FEATURES_DIR = path.join(__dirname, 'src', 'features');

const features = ['delivery', 'product', 'vendor', 'admin', 'consultation'];

// Create directories
features.forEach(f => {
  const dir = path.join(FEATURES_DIR, f);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Helper to convert CJS to ESM
const convertToESM = (content) => {
  let result = content;
  // Convert requires: const X = require('X') -> import X from 'X'
  result = result.replace(/const\s+([a-zA-Z0-9_{}]+)\s*=\s*require\(['"]([^'"]+)['"]\);?/g, 'import $1 from "$2";');
  // Convert exports: module.exports = X -> export default X
  result = result.replace(/module\.exports\s*=\s*/g, 'export default ');
  // Convert exports: exports.X = Y -> export const X = Y
  result = result.replace(/exports\.([a-zA-Z0-9_]+)\s*=\s*/g, 'export const $1 = ');
  
  // Fix local imports (add .js extension)
  result = result.replace(/import\s+(.*?)\s+from\s+['"](\..*?)(?<!\.js)['"];/g, 'import $1 from "$2.js";');
  
  return result;
};

const moveAndConvert = (src, dest) => {
  if (fs.existsSync(src)) {
    const content = fs.readFileSync(src, 'utf8');
    const esmContent = convertToESM(content);
    fs.writeFileSync(dest, esmContent);
    fs.unlinkSync(src);
    console.log(`Migrated: ${src} -> ${dest}`);
  }
};

// 1. Models
const modelMap = {
  'Delivery.js': 'delivery/delivery.model.js',
  'Product.js': 'product/product.model.js',
  'Vendor.js': 'vendor/vendor.model.js',
  'admin.js': 'admin/admin.model.js',
  'consultation.js': 'consultation/consultation.model.js',
  'stock.js': 'product/stock.model.js'
};

Object.entries(modelMap).forEach(([oldName, newPath]) => {
  moveAndConvert(path.join(__dirname, 'models', oldName), path.join(FEATURES_DIR, newPath));
});

// 2. Controllers
const controllerMap = {
  'vendorController.js': 'vendor/vendor.controller.js',
  'productController.js': 'product/product.controller.js'
};

Object.entries(controllerMap).forEach(([oldName, newPath]) => {
  moveAndConvert(path.join(__dirname, 'controllers', oldName), path.join(FEATURES_DIR, newPath));
});

// 3. Routes
const routeMap = {
  'deliveryRoutes.js': 'delivery/delivery.routes.js',
  'productRoutes.js': 'product/product.routes.js',
  'vendorRoutes.js': 'vendor/vendor.routes.js'
};

Object.entries(routeMap).forEach(([oldName, newPath]) => {
  moveAndConvert(path.join(__dirname, 'routes', oldName), path.join(FEATURES_DIR, newPath));
});

console.log("Migration complete!");
