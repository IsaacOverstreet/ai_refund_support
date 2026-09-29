var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Param, Patch, Query } from "@nestjs/common";
import { IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { AdminService } from "./admin.service.js";
class RequestFilterDto {
    status;
}
__decorate([
    IsOptional(),
    IsIn(["APPROVED", "DENIED", "ESCALATED"]),
    __metadata("design:type", String)
], RequestFilterDto.prototype, "status", void 0);
class OverrideDto {
    status;
    note;
}
__decorate([
    IsIn(["APPROVED", "DENIED", "ESCALATED"]),
    __metadata("design:type", String)
], OverrideDto.prototype, "status", void 0);
__decorate([
    IsString(),
    MinLength(3),
    __metadata("design:type", String)
], OverrideDto.prototype, "note", void 0);
let AdminController = class AdminController {
    admin;
    constructor(admin) {
        this.admin = admin;
    }
    getStats() {
        return this.admin.getStats();
    }
    listRequests(filter) {
        return this.admin.listRequests(filter.status);
    }
    getRequest(id) {
        return this.admin.getRequestDetail(id);
    }
    override(id, dto) {
        return this.admin.overrideDecision(id, dto.status, dto.note);
    }
};
__decorate([
    Get("stats"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getStats", null);
__decorate([
    Get("requests"),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestFilterDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listRequests", null);
__decorate([
    Get("requests/:id"),
    __param(0, Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getRequest", null);
__decorate([
    Patch("requests/:id/decision"),
    __param(0, Param("id")),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, OverrideDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "override", null);
AdminController = __decorate([
    Controller("api/admin"),
    __metadata("design:paramtypes", [AdminService])
], AdminController);
export { AdminController };
//# sourceMappingURL=admin.controller.js.map