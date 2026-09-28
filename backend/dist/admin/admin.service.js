var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats() {
        const [total, approved, denied, escalated] = await Promise.all([
            this.prisma.refundDecision.count(),
            this.prisma.refundDecision.count({
                where: { status: "APPROVED" },
            }),
            this.prisma.refundDecision.count({
                where: { status: "DENIED" },
            }),
            this.prisma.refundDecision.count({
                where: { status: "ESCALATED" },
            }),
        ]);
        return {
            total,
            approved,
            denied,
            escalated,
        };
    }
    async listRequests(status) {
        return this.prisma.refundRequest.findMany({
            where: status
                ? {
                    decision: {
                        status,
                    },
                }
                : undefined,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                order: {
                    include: {
                        items: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
                decision: true,
                chatMessages: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 2,
                },
                auditLogs: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 5,
                },
            },
        });
    }
    async getRequestDetail(id) {
        return this.prisma.refundRequest.findUnique({
            where: { id },
            include: {
                customer: true,
                order: {
                    include: {
                        items: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
                decision: true,
                chatMessages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
                auditLogs: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });
    }
    async overrideDecision(id, status, note) {
        const decision = await this.prisma.refundDecision.update({
            where: {
                refundRequestId: id,
            },
            data: {
                status,
                source: "HUMAN",
                reason: note,
                confidence: 1,
            },
        });
        await this.prisma.auditLog.create({
            data: {
                refundRequestId: id,
                action: `human_override_${status.toLowerCase()}`,
                details: {
                    note,
                },
            },
        });
        return decision;
    }
};
AdminService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AdminService);
export { AdminService };
//# sourceMappingURL=admin.service.js.map