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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updateTodo = exports.getTodo = exports.getTodos = exports.createTodo = exports.deleteUsers = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var utils_1 = require("./utils");
var Todos_1 = require("./entities/Todos");
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newDefaultTodo, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newDefaultTodo = typeorm_1.getRepository(Todos_1.Todos).create();
                newDefaultTodo.label = "Example";
                newDefaultTodo.done = false;
                newUser = userRepo.create();
                newUser.first_name = req.body.first_name;
                newUser.last_name = req.body.last_name;
                newUser.email = req.body.email;
                newUser.password = req.body.password;
                newUser.todo = [newDefaultTodo];
                return [4 /*yield*/, userRepo.save(newUser)]; //Grabo el nuevo usuario 
            case 2:
                results = _a.sent() //Grabo el nuevo usuario 
                ;
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
//Find all users
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).find({ relations: ["todo"] })];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
//Find user by id
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.id)];
            case 1:
                users = _a.sent();
                if (!users)
                    throw new utils_1.Exception("User doesn't exist.");
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUser = getUser;
//Update a user
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                typeorm_1.getRepository(Users_1.Users).merge(user, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(user)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 3: return [2 /*return*/, res.status(404).json({ msg: "No user found." })];
        }
    });
}); };
exports.updateUser = updateUser;
//Delete a user and all his todos
var deleteUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, users_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.id)];
            case 1:
                users = _a.sent();
                if (!!users) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ msg: "This user doesn't exist." })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users)["delete"](req.params.id)];
            case 3:
                users_1 = _a.sent();
                return [2 /*return*/, res.json(users_1)];
        }
    });
}); };
exports.deleteUsers = deleteUsers;
var createTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newTodo, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.label)
                    throw new utils_1.Exception("Please provide a label");
                if (!req.body.done)
                    throw new utils_1.Exception("Please provide a status");
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne({ relations: ["todo"], where: { id: req.params.id } })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                newTodo = new Todos_1.Todos();
                newTodo.label = req.body.label;
                newTodo.done = false;
                user.todo.push(newTodo);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(user)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 3: return [2 /*return*/, res.json("Todo not found.")];
        }
    });
}); };
exports.createTodo = createTodo;
//Get all todos
var getTodos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Todos_1.Todos).find({ relations: ["users"] })];
            case 1:
                todos = _a.sent();
                return [2 /*return*/, res.json(todos)];
        }
    });
}); };
exports.getTodos = getTodos;
//Get a specific todo by id
var getTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne({ relations: ["todo"], where: { id: req.params.id } })];
            case 1:
                results = _a.sent();
                if (!results)
                    throw new utils_1.Exception("User doesn't have any todos.");
                return [2 /*return*/, res.json(results.todo)];
        }
    });
}); };
exports.getTodo = getTodo;
//Update a specific todo
var updateTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todoRepo, todo, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                todoRepo = typeorm_1.getRepository(Todos_1.Todos);
                return [4 /*yield*/, todoRepo.findOne(req.params.id)];
            case 1:
                todo = _a.sent();
                if (!todo)
                    throw new utils_1.Exception("No Todo found");
                todoRepo.merge(todo, req.body);
                return [4 /*yield*/, todoRepo.save(todo)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.updateTodo = updateTodo;
