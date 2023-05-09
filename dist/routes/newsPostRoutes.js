"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsPostController_1 = require("../controllers/newsPostController");
const router = express_1.default.Router();
router.post('/', newsPostController_1.createNewsPost);
router.get('/', newsPostController_1.getAllNewsPosts);
router.get('/:id', newsPostController_1.getNewsPostById);
router.put('/:id', newsPostController_1.updateNewsPost);
router.delete('/:id', newsPostController_1.deleteNewsPost);
exports.default = router;
