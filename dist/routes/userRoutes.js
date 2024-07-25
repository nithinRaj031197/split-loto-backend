"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = __importDefault(require("../data-source"));
const userSchema_1 = require("../schemas/userSchema");
const router = express_1.default.Router();
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send("Name, email, and password are required");
    }
    try {
        if (!data_source_1.default.isInitialized) {
            yield data_source_1.default.initialize();
        }
        const userRepository = data_source_1.default.getRepository(userSchema_1.User);
        const user = new userSchema_1.User();
        user.name = name;
        user.email = email;
        user.password = password;
        yield userRepository.save(user);
        res.status(201).send(`User created with ID: ${user.id}`);
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
}));
exports.default = router;
