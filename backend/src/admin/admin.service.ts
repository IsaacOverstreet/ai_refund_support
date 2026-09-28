import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Dashboard summary
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

  // Get refund requests for the admin dashboard
  async listRequests(status?: "APPROVED" | "DENIED" | "ESCALATED") {
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

  // Get full details for one refund request
  async getRequestDetail(id: string) {
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

  // Allow a support agent to change the decision
  async overrideDecision(
    id: string,
    status: "APPROVED" | "DENIED" | "ESCALATED",
    note: string,
  ) {
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
}
