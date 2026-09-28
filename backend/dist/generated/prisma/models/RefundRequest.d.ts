import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RefundRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$RefundRequestPayload>;
export type AggregateRefundRequest = {
    _count: RefundRequestCountAggregateOutputType | null;
    _avg: RefundRequestAvgAggregateOutputType | null;
    _sum: RefundRequestSumAggregateOutputType | null;
    _min: RefundRequestMinAggregateOutputType | null;
    _max: RefundRequestMaxAggregateOutputType | null;
};
export type RefundRequestAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type RefundRequestSumAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type RefundRequestMinAggregateOutputType = {
    id: string | null;
    customerId: string | null;
    orderId: string | null;
    reason: $Enums.RefundReason | null;
    description: string | null;
    amount: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RefundRequestMaxAggregateOutputType = {
    id: string | null;
    customerId: string | null;
    orderId: string | null;
    reason: $Enums.RefundReason | null;
    description: string | null;
    amount: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RefundRequestCountAggregateOutputType = {
    id: number;
    customerId: number;
    orderId: number;
    reason: number;
    description: number;
    amount: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type RefundRequestAvgAggregateInputType = {
    amount?: true;
};
export type RefundRequestSumAggregateInputType = {
    amount?: true;
};
export type RefundRequestMinAggregateInputType = {
    id?: true;
    customerId?: true;
    orderId?: true;
    reason?: true;
    description?: true;
    amount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RefundRequestMaxAggregateInputType = {
    id?: true;
    customerId?: true;
    orderId?: true;
    reason?: true;
    description?: true;
    amount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RefundRequestCountAggregateInputType = {
    id?: true;
    customerId?: true;
    orderId?: true;
    reason?: true;
    description?: true;
    amount?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type RefundRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefundRequestWhereInput;
    orderBy?: Prisma.RefundRequestOrderByWithRelationInput | Prisma.RefundRequestOrderByWithRelationInput[];
    cursor?: Prisma.RefundRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RefundRequestCountAggregateInputType;
    _avg?: RefundRequestAvgAggregateInputType;
    _sum?: RefundRequestSumAggregateInputType;
    _min?: RefundRequestMinAggregateInputType;
    _max?: RefundRequestMaxAggregateInputType;
};
export type GetRefundRequestAggregateType<T extends RefundRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateRefundRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRefundRequest[P]> : Prisma.GetScalarType<T[P], AggregateRefundRequest[P]>;
};
export type RefundRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefundRequestWhereInput;
    orderBy?: Prisma.RefundRequestOrderByWithAggregationInput | Prisma.RefundRequestOrderByWithAggregationInput[];
    by: Prisma.RefundRequestScalarFieldEnum[] | Prisma.RefundRequestScalarFieldEnum;
    having?: Prisma.RefundRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RefundRequestCountAggregateInputType | true;
    _avg?: RefundRequestAvgAggregateInputType;
    _sum?: RefundRequestSumAggregateInputType;
    _min?: RefundRequestMinAggregateInputType;
    _max?: RefundRequestMaxAggregateInputType;
};
export type RefundRequestGroupByOutputType = {
    id: string;
    customerId: string;
    orderId: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal;
    createdAt: Date;
    updatedAt: Date;
    _count: RefundRequestCountAggregateOutputType | null;
    _avg: RefundRequestAvgAggregateOutputType | null;
    _sum: RefundRequestSumAggregateOutputType | null;
    _min: RefundRequestMinAggregateOutputType | null;
    _max: RefundRequestMaxAggregateOutputType | null;
};
export type GetRefundRequestGroupByPayload<T extends RefundRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RefundRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RefundRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RefundRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RefundRequestGroupByOutputType[P]>;
}>>;
export type RefundRequestWhereInput = {
    AND?: Prisma.RefundRequestWhereInput | Prisma.RefundRequestWhereInput[];
    OR?: Prisma.RefundRequestWhereInput[];
    NOT?: Prisma.RefundRequestWhereInput | Prisma.RefundRequestWhereInput[];
    id?: Prisma.StringFilter<"RefundRequest"> | string;
    customerId?: Prisma.StringFilter<"RefundRequest"> | string;
    orderId?: Prisma.StringFilter<"RefundRequest"> | string;
    reason?: Prisma.EnumRefundReasonFilter<"RefundRequest"> | $Enums.RefundReason;
    description?: Prisma.StringFilter<"RefundRequest"> | string;
    amount?: Prisma.DecimalFilter<"RefundRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"RefundRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RefundRequest"> | Date | string;
    chatMessages?: Prisma.ChatMessageListRelationFilter;
    customer?: Prisma.XOR<Prisma.CustomerScalarRelationFilter, Prisma.CustomerWhereInput>;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    decision?: Prisma.XOR<Prisma.RefundDecisionNullableScalarRelationFilter, Prisma.RefundDecisionWhereInput> | null;
    auditLogs?: Prisma.AuditLogListRelationFilter;
};
export type RefundRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    chatMessages?: Prisma.ChatMessageOrderByRelationAggregateInput;
    customer?: Prisma.CustomerOrderByWithRelationInput;
    order?: Prisma.OrderOrderByWithRelationInput;
    decision?: Prisma.RefundDecisionOrderByWithRelationInput;
    auditLogs?: Prisma.AuditLogOrderByRelationAggregateInput;
};
export type RefundRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RefundRequestWhereInput | Prisma.RefundRequestWhereInput[];
    OR?: Prisma.RefundRequestWhereInput[];
    NOT?: Prisma.RefundRequestWhereInput | Prisma.RefundRequestWhereInput[];
    customerId?: Prisma.StringFilter<"RefundRequest"> | string;
    orderId?: Prisma.StringFilter<"RefundRequest"> | string;
    reason?: Prisma.EnumRefundReasonFilter<"RefundRequest"> | $Enums.RefundReason;
    description?: Prisma.StringFilter<"RefundRequest"> | string;
    amount?: Prisma.DecimalFilter<"RefundRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"RefundRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RefundRequest"> | Date | string;
    chatMessages?: Prisma.ChatMessageListRelationFilter;
    customer?: Prisma.XOR<Prisma.CustomerScalarRelationFilter, Prisma.CustomerWhereInput>;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    decision?: Prisma.XOR<Prisma.RefundDecisionNullableScalarRelationFilter, Prisma.RefundDecisionWhereInput> | null;
    auditLogs?: Prisma.AuditLogListRelationFilter;
}, "id">;
export type RefundRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.RefundRequestCountOrderByAggregateInput;
    _avg?: Prisma.RefundRequestAvgOrderByAggregateInput;
    _max?: Prisma.RefundRequestMaxOrderByAggregateInput;
    _min?: Prisma.RefundRequestMinOrderByAggregateInput;
    _sum?: Prisma.RefundRequestSumOrderByAggregateInput;
};
export type RefundRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.RefundRequestScalarWhereWithAggregatesInput | Prisma.RefundRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.RefundRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RefundRequestScalarWhereWithAggregatesInput | Prisma.RefundRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RefundRequest"> | string;
    customerId?: Prisma.StringWithAggregatesFilter<"RefundRequest"> | string;
    orderId?: Prisma.StringWithAggregatesFilter<"RefundRequest"> | string;
    reason?: Prisma.EnumRefundReasonWithAggregatesFilter<"RefundRequest"> | $Enums.RefundReason;
    description?: Prisma.StringWithAggregatesFilter<"RefundRequest"> | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"RefundRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RefundRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"RefundRequest"> | Date | string;
};
export type RefundRequestCreateInput = {
    id?: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatMessages?: Prisma.ChatMessageCreateNestedManyWithoutRefundRequestInput;
    customer: Prisma.CustomerCreateNestedOneWithoutRefundRequestsInput;
    order: Prisma.OrderCreateNestedOneWithoutRefundRequestsInput;
    decision?: Prisma.RefundDecisionCreateNestedOneWithoutRefundRequestInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutRefundRequestInput;
};
export type RefundRequestUncheckedCreateInput = {
    id?: string;
    customerId: string;
    orderId: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutRefundRequestInput;
    decision?: Prisma.RefundDecisionUncheckedCreateNestedOneWithoutRefundRequestInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutRefundRequestInput;
};
export type RefundRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chatMessages?: Prisma.ChatMessageUpdateManyWithoutRefundRequestNestedInput;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutRefundRequestsNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutRefundRequestsNestedInput;
    decision?: Prisma.RefundDecisionUpdateOneWithoutRefundRequestNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutRefundRequestNestedInput;
};
export type RefundRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chatMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutRefundRequestNestedInput;
    decision?: Prisma.RefundDecisionUncheckedUpdateOneWithoutRefundRequestNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutRefundRequestNestedInput;
};
export type RefundRequestCreateManyInput = {
    id?: string;
    customerId: string;
    orderId: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RefundRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefundRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefundRequestListRelationFilter = {
    every?: Prisma.RefundRequestWhereInput;
    some?: Prisma.RefundRequestWhereInput;
    none?: Prisma.RefundRequestWhereInput;
};
export type RefundRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RefundRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RefundRequestAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type RefundRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RefundRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RefundRequestSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type RefundRequestScalarRelationFilter = {
    is?: Prisma.RefundRequestWhereInput;
    isNot?: Prisma.RefundRequestWhereInput;
};
export type RefundRequestCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.RefundRequestCreateWithoutCustomerInput, Prisma.RefundRequestUncheckedCreateWithoutCustomerInput> | Prisma.RefundRequestCreateWithoutCustomerInput[] | Prisma.RefundRequestUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.RefundRequestCreateOrConnectWithoutCustomerInput | Prisma.RefundRequestCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.RefundRequestCreateManyCustomerInputEnvelope;
    connect?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
};
export type RefundRequestUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.RefundRequestCreateWithoutCustomerInput, Prisma.RefundRequestUncheckedCreateWithoutCustomerInput> | Prisma.RefundRequestCreateWithoutCustomerInput[] | Prisma.RefundRequestUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.RefundRequestCreateOrConnectWithoutCustomerInput | Prisma.RefundRequestCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.RefundRequestCreateManyCustomerInputEnvelope;
    connect?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
};
export type RefundRequestUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.RefundRequestCreateWithoutCustomerInput, Prisma.RefundRequestUncheckedCreateWithoutCustomerInput> | Prisma.RefundRequestCreateWithoutCustomerInput[] | Prisma.RefundRequestUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.RefundRequestCreateOrConnectWithoutCustomerInput | Prisma.RefundRequestCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.RefundRequestUpsertWithWhereUniqueWithoutCustomerInput | Prisma.RefundRequestUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.RefundRequestCreateManyCustomerInputEnvelope;
    set?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    disconnect?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    delete?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    connect?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    update?: Prisma.RefundRequestUpdateWithWhereUniqueWithoutCustomerInput | Prisma.RefundRequestUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.RefundRequestUpdateManyWithWhereWithoutCustomerInput | Prisma.RefundRequestUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.RefundRequestScalarWhereInput | Prisma.RefundRequestScalarWhereInput[];
};
export type RefundRequestUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.RefundRequestCreateWithoutCustomerInput, Prisma.RefundRequestUncheckedCreateWithoutCustomerInput> | Prisma.RefundRequestCreateWithoutCustomerInput[] | Prisma.RefundRequestUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.RefundRequestCreateOrConnectWithoutCustomerInput | Prisma.RefundRequestCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.RefundRequestUpsertWithWhereUniqueWithoutCustomerInput | Prisma.RefundRequestUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.RefundRequestCreateManyCustomerInputEnvelope;
    set?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    disconnect?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    delete?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    connect?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    update?: Prisma.RefundRequestUpdateWithWhereUniqueWithoutCustomerInput | Prisma.RefundRequestUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.RefundRequestUpdateManyWithWhereWithoutCustomerInput | Prisma.RefundRequestUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.RefundRequestScalarWhereInput | Prisma.RefundRequestScalarWhereInput[];
};
export type RefundRequestCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.RefundRequestCreateWithoutOrderInput, Prisma.RefundRequestUncheckedCreateWithoutOrderInput> | Prisma.RefundRequestCreateWithoutOrderInput[] | Prisma.RefundRequestUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.RefundRequestCreateOrConnectWithoutOrderInput | Prisma.RefundRequestCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.RefundRequestCreateManyOrderInputEnvelope;
    connect?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
};
export type RefundRequestUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.RefundRequestCreateWithoutOrderInput, Prisma.RefundRequestUncheckedCreateWithoutOrderInput> | Prisma.RefundRequestCreateWithoutOrderInput[] | Prisma.RefundRequestUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.RefundRequestCreateOrConnectWithoutOrderInput | Prisma.RefundRequestCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.RefundRequestCreateManyOrderInputEnvelope;
    connect?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
};
export type RefundRequestUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.RefundRequestCreateWithoutOrderInput, Prisma.RefundRequestUncheckedCreateWithoutOrderInput> | Prisma.RefundRequestCreateWithoutOrderInput[] | Prisma.RefundRequestUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.RefundRequestCreateOrConnectWithoutOrderInput | Prisma.RefundRequestCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.RefundRequestUpsertWithWhereUniqueWithoutOrderInput | Prisma.RefundRequestUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.RefundRequestCreateManyOrderInputEnvelope;
    set?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    disconnect?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    delete?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    connect?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    update?: Prisma.RefundRequestUpdateWithWhereUniqueWithoutOrderInput | Prisma.RefundRequestUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.RefundRequestUpdateManyWithWhereWithoutOrderInput | Prisma.RefundRequestUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.RefundRequestScalarWhereInput | Prisma.RefundRequestScalarWhereInput[];
};
export type RefundRequestUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.RefundRequestCreateWithoutOrderInput, Prisma.RefundRequestUncheckedCreateWithoutOrderInput> | Prisma.RefundRequestCreateWithoutOrderInput[] | Prisma.RefundRequestUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.RefundRequestCreateOrConnectWithoutOrderInput | Prisma.RefundRequestCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.RefundRequestUpsertWithWhereUniqueWithoutOrderInput | Prisma.RefundRequestUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.RefundRequestCreateManyOrderInputEnvelope;
    set?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    disconnect?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    delete?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    connect?: Prisma.RefundRequestWhereUniqueInput | Prisma.RefundRequestWhereUniqueInput[];
    update?: Prisma.RefundRequestUpdateWithWhereUniqueWithoutOrderInput | Prisma.RefundRequestUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.RefundRequestUpdateManyWithWhereWithoutOrderInput | Prisma.RefundRequestUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.RefundRequestScalarWhereInput | Prisma.RefundRequestScalarWhereInput[];
};
export type EnumRefundReasonFieldUpdateOperationsInput = {
    set?: $Enums.RefundReason;
};
export type RefundRequestCreateNestedOneWithoutDecisionInput = {
    create?: Prisma.XOR<Prisma.RefundRequestCreateWithoutDecisionInput, Prisma.RefundRequestUncheckedCreateWithoutDecisionInput>;
    connectOrCreate?: Prisma.RefundRequestCreateOrConnectWithoutDecisionInput;
    connect?: Prisma.RefundRequestWhereUniqueInput;
};
export type RefundRequestUpdateOneRequiredWithoutDecisionNestedInput = {
    create?: Prisma.XOR<Prisma.RefundRequestCreateWithoutDecisionInput, Prisma.RefundRequestUncheckedCreateWithoutDecisionInput>;
    connectOrCreate?: Prisma.RefundRequestCreateOrConnectWithoutDecisionInput;
    upsert?: Prisma.RefundRequestUpsertWithoutDecisionInput;
    connect?: Prisma.RefundRequestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RefundRequestUpdateToOneWithWhereWithoutDecisionInput, Prisma.RefundRequestUpdateWithoutDecisionInput>, Prisma.RefundRequestUncheckedUpdateWithoutDecisionInput>;
};
export type RefundRequestCreateNestedOneWithoutChatMessagesInput = {
    create?: Prisma.XOR<Prisma.RefundRequestCreateWithoutChatMessagesInput, Prisma.RefundRequestUncheckedCreateWithoutChatMessagesInput>;
    connectOrCreate?: Prisma.RefundRequestCreateOrConnectWithoutChatMessagesInput;
    connect?: Prisma.RefundRequestWhereUniqueInput;
};
export type RefundRequestUpdateOneRequiredWithoutChatMessagesNestedInput = {
    create?: Prisma.XOR<Prisma.RefundRequestCreateWithoutChatMessagesInput, Prisma.RefundRequestUncheckedCreateWithoutChatMessagesInput>;
    connectOrCreate?: Prisma.RefundRequestCreateOrConnectWithoutChatMessagesInput;
    upsert?: Prisma.RefundRequestUpsertWithoutChatMessagesInput;
    connect?: Prisma.RefundRequestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RefundRequestUpdateToOneWithWhereWithoutChatMessagesInput, Prisma.RefundRequestUpdateWithoutChatMessagesInput>, Prisma.RefundRequestUncheckedUpdateWithoutChatMessagesInput>;
};
export type RefundRequestCreateNestedOneWithoutAuditLogsInput = {
    create?: Prisma.XOR<Prisma.RefundRequestCreateWithoutAuditLogsInput, Prisma.RefundRequestUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.RefundRequestCreateOrConnectWithoutAuditLogsInput;
    connect?: Prisma.RefundRequestWhereUniqueInput;
};
export type RefundRequestUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: Prisma.XOR<Prisma.RefundRequestCreateWithoutAuditLogsInput, Prisma.RefundRequestUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.RefundRequestCreateOrConnectWithoutAuditLogsInput;
    upsert?: Prisma.RefundRequestUpsertWithoutAuditLogsInput;
    connect?: Prisma.RefundRequestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RefundRequestUpdateToOneWithWhereWithoutAuditLogsInput, Prisma.RefundRequestUpdateWithoutAuditLogsInput>, Prisma.RefundRequestUncheckedUpdateWithoutAuditLogsInput>;
};
export type RefundRequestCreateWithoutCustomerInput = {
    id?: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatMessages?: Prisma.ChatMessageCreateNestedManyWithoutRefundRequestInput;
    order: Prisma.OrderCreateNestedOneWithoutRefundRequestsInput;
    decision?: Prisma.RefundDecisionCreateNestedOneWithoutRefundRequestInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutRefundRequestInput;
};
export type RefundRequestUncheckedCreateWithoutCustomerInput = {
    id?: string;
    orderId: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutRefundRequestInput;
    decision?: Prisma.RefundDecisionUncheckedCreateNestedOneWithoutRefundRequestInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutRefundRequestInput;
};
export type RefundRequestCreateOrConnectWithoutCustomerInput = {
    where: Prisma.RefundRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.RefundRequestCreateWithoutCustomerInput, Prisma.RefundRequestUncheckedCreateWithoutCustomerInput>;
};
export type RefundRequestCreateManyCustomerInputEnvelope = {
    data: Prisma.RefundRequestCreateManyCustomerInput | Prisma.RefundRequestCreateManyCustomerInput[];
    skipDuplicates?: boolean;
};
export type RefundRequestUpsertWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.RefundRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.RefundRequestUpdateWithoutCustomerInput, Prisma.RefundRequestUncheckedUpdateWithoutCustomerInput>;
    create: Prisma.XOR<Prisma.RefundRequestCreateWithoutCustomerInput, Prisma.RefundRequestUncheckedCreateWithoutCustomerInput>;
};
export type RefundRequestUpdateWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.RefundRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.RefundRequestUpdateWithoutCustomerInput, Prisma.RefundRequestUncheckedUpdateWithoutCustomerInput>;
};
export type RefundRequestUpdateManyWithWhereWithoutCustomerInput = {
    where: Prisma.RefundRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.RefundRequestUpdateManyMutationInput, Prisma.RefundRequestUncheckedUpdateManyWithoutCustomerInput>;
};
export type RefundRequestScalarWhereInput = {
    AND?: Prisma.RefundRequestScalarWhereInput | Prisma.RefundRequestScalarWhereInput[];
    OR?: Prisma.RefundRequestScalarWhereInput[];
    NOT?: Prisma.RefundRequestScalarWhereInput | Prisma.RefundRequestScalarWhereInput[];
    id?: Prisma.StringFilter<"RefundRequest"> | string;
    customerId?: Prisma.StringFilter<"RefundRequest"> | string;
    orderId?: Prisma.StringFilter<"RefundRequest"> | string;
    reason?: Prisma.EnumRefundReasonFilter<"RefundRequest"> | $Enums.RefundReason;
    description?: Prisma.StringFilter<"RefundRequest"> | string;
    amount?: Prisma.DecimalFilter<"RefundRequest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"RefundRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RefundRequest"> | Date | string;
};
export type RefundRequestCreateWithoutOrderInput = {
    id?: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatMessages?: Prisma.ChatMessageCreateNestedManyWithoutRefundRequestInput;
    customer: Prisma.CustomerCreateNestedOneWithoutRefundRequestsInput;
    decision?: Prisma.RefundDecisionCreateNestedOneWithoutRefundRequestInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutRefundRequestInput;
};
export type RefundRequestUncheckedCreateWithoutOrderInput = {
    id?: string;
    customerId: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutRefundRequestInput;
    decision?: Prisma.RefundDecisionUncheckedCreateNestedOneWithoutRefundRequestInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutRefundRequestInput;
};
export type RefundRequestCreateOrConnectWithoutOrderInput = {
    where: Prisma.RefundRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.RefundRequestCreateWithoutOrderInput, Prisma.RefundRequestUncheckedCreateWithoutOrderInput>;
};
export type RefundRequestCreateManyOrderInputEnvelope = {
    data: Prisma.RefundRequestCreateManyOrderInput | Prisma.RefundRequestCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type RefundRequestUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.RefundRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.RefundRequestUpdateWithoutOrderInput, Prisma.RefundRequestUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.RefundRequestCreateWithoutOrderInput, Prisma.RefundRequestUncheckedCreateWithoutOrderInput>;
};
export type RefundRequestUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.RefundRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.RefundRequestUpdateWithoutOrderInput, Prisma.RefundRequestUncheckedUpdateWithoutOrderInput>;
};
export type RefundRequestUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.RefundRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.RefundRequestUpdateManyMutationInput, Prisma.RefundRequestUncheckedUpdateManyWithoutOrderInput>;
};
export type RefundRequestCreateWithoutDecisionInput = {
    id?: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatMessages?: Prisma.ChatMessageCreateNestedManyWithoutRefundRequestInput;
    customer: Prisma.CustomerCreateNestedOneWithoutRefundRequestsInput;
    order: Prisma.OrderCreateNestedOneWithoutRefundRequestsInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutRefundRequestInput;
};
export type RefundRequestUncheckedCreateWithoutDecisionInput = {
    id?: string;
    customerId: string;
    orderId: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutRefundRequestInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutRefundRequestInput;
};
export type RefundRequestCreateOrConnectWithoutDecisionInput = {
    where: Prisma.RefundRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.RefundRequestCreateWithoutDecisionInput, Prisma.RefundRequestUncheckedCreateWithoutDecisionInput>;
};
export type RefundRequestUpsertWithoutDecisionInput = {
    update: Prisma.XOR<Prisma.RefundRequestUpdateWithoutDecisionInput, Prisma.RefundRequestUncheckedUpdateWithoutDecisionInput>;
    create: Prisma.XOR<Prisma.RefundRequestCreateWithoutDecisionInput, Prisma.RefundRequestUncheckedCreateWithoutDecisionInput>;
    where?: Prisma.RefundRequestWhereInput;
};
export type RefundRequestUpdateToOneWithWhereWithoutDecisionInput = {
    where?: Prisma.RefundRequestWhereInput;
    data: Prisma.XOR<Prisma.RefundRequestUpdateWithoutDecisionInput, Prisma.RefundRequestUncheckedUpdateWithoutDecisionInput>;
};
export type RefundRequestUpdateWithoutDecisionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chatMessages?: Prisma.ChatMessageUpdateManyWithoutRefundRequestNestedInput;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutRefundRequestsNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutRefundRequestsNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutRefundRequestNestedInput;
};
export type RefundRequestUncheckedUpdateWithoutDecisionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chatMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutRefundRequestNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutRefundRequestNestedInput;
};
export type RefundRequestCreateWithoutChatMessagesInput = {
    id?: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    customer: Prisma.CustomerCreateNestedOneWithoutRefundRequestsInput;
    order: Prisma.OrderCreateNestedOneWithoutRefundRequestsInput;
    decision?: Prisma.RefundDecisionCreateNestedOneWithoutRefundRequestInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutRefundRequestInput;
};
export type RefundRequestUncheckedCreateWithoutChatMessagesInput = {
    id?: string;
    customerId: string;
    orderId: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    decision?: Prisma.RefundDecisionUncheckedCreateNestedOneWithoutRefundRequestInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutRefundRequestInput;
};
export type RefundRequestCreateOrConnectWithoutChatMessagesInput = {
    where: Prisma.RefundRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.RefundRequestCreateWithoutChatMessagesInput, Prisma.RefundRequestUncheckedCreateWithoutChatMessagesInput>;
};
export type RefundRequestUpsertWithoutChatMessagesInput = {
    update: Prisma.XOR<Prisma.RefundRequestUpdateWithoutChatMessagesInput, Prisma.RefundRequestUncheckedUpdateWithoutChatMessagesInput>;
    create: Prisma.XOR<Prisma.RefundRequestCreateWithoutChatMessagesInput, Prisma.RefundRequestUncheckedCreateWithoutChatMessagesInput>;
    where?: Prisma.RefundRequestWhereInput;
};
export type RefundRequestUpdateToOneWithWhereWithoutChatMessagesInput = {
    where?: Prisma.RefundRequestWhereInput;
    data: Prisma.XOR<Prisma.RefundRequestUpdateWithoutChatMessagesInput, Prisma.RefundRequestUncheckedUpdateWithoutChatMessagesInput>;
};
export type RefundRequestUpdateWithoutChatMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutRefundRequestsNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutRefundRequestsNestedInput;
    decision?: Prisma.RefundDecisionUpdateOneWithoutRefundRequestNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutRefundRequestNestedInput;
};
export type RefundRequestUncheckedUpdateWithoutChatMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decision?: Prisma.RefundDecisionUncheckedUpdateOneWithoutRefundRequestNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutRefundRequestNestedInput;
};
export type RefundRequestCreateWithoutAuditLogsInput = {
    id?: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatMessages?: Prisma.ChatMessageCreateNestedManyWithoutRefundRequestInput;
    customer: Prisma.CustomerCreateNestedOneWithoutRefundRequestsInput;
    order: Prisma.OrderCreateNestedOneWithoutRefundRequestsInput;
    decision?: Prisma.RefundDecisionCreateNestedOneWithoutRefundRequestInput;
};
export type RefundRequestUncheckedCreateWithoutAuditLogsInput = {
    id?: string;
    customerId: string;
    orderId: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chatMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutRefundRequestInput;
    decision?: Prisma.RefundDecisionUncheckedCreateNestedOneWithoutRefundRequestInput;
};
export type RefundRequestCreateOrConnectWithoutAuditLogsInput = {
    where: Prisma.RefundRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.RefundRequestCreateWithoutAuditLogsInput, Prisma.RefundRequestUncheckedCreateWithoutAuditLogsInput>;
};
export type RefundRequestUpsertWithoutAuditLogsInput = {
    update: Prisma.XOR<Prisma.RefundRequestUpdateWithoutAuditLogsInput, Prisma.RefundRequestUncheckedUpdateWithoutAuditLogsInput>;
    create: Prisma.XOR<Prisma.RefundRequestCreateWithoutAuditLogsInput, Prisma.RefundRequestUncheckedCreateWithoutAuditLogsInput>;
    where?: Prisma.RefundRequestWhereInput;
};
export type RefundRequestUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: Prisma.RefundRequestWhereInput;
    data: Prisma.XOR<Prisma.RefundRequestUpdateWithoutAuditLogsInput, Prisma.RefundRequestUncheckedUpdateWithoutAuditLogsInput>;
};
export type RefundRequestUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chatMessages?: Prisma.ChatMessageUpdateManyWithoutRefundRequestNestedInput;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutRefundRequestsNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutRefundRequestsNestedInput;
    decision?: Prisma.RefundDecisionUpdateOneWithoutRefundRequestNestedInput;
};
export type RefundRequestUncheckedUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chatMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutRefundRequestNestedInput;
    decision?: Prisma.RefundDecisionUncheckedUpdateOneWithoutRefundRequestNestedInput;
};
export type RefundRequestCreateManyCustomerInput = {
    id?: string;
    orderId: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RefundRequestUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chatMessages?: Prisma.ChatMessageUpdateManyWithoutRefundRequestNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutRefundRequestsNestedInput;
    decision?: Prisma.RefundDecisionUpdateOneWithoutRefundRequestNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutRefundRequestNestedInput;
};
export type RefundRequestUncheckedUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chatMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutRefundRequestNestedInput;
    decision?: Prisma.RefundDecisionUncheckedUpdateOneWithoutRefundRequestNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutRefundRequestNestedInput;
};
export type RefundRequestUncheckedUpdateManyWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefundRequestCreateManyOrderInput = {
    id?: string;
    customerId: string;
    reason: $Enums.RefundReason;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RefundRequestUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chatMessages?: Prisma.ChatMessageUpdateManyWithoutRefundRequestNestedInput;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutRefundRequestsNestedInput;
    decision?: Prisma.RefundDecisionUpdateOneWithoutRefundRequestNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutRefundRequestNestedInput;
};
export type RefundRequestUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chatMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutRefundRequestNestedInput;
    decision?: Prisma.RefundDecisionUncheckedUpdateOneWithoutRefundRequestNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutRefundRequestNestedInput;
};
export type RefundRequestUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefundRequestCountOutputType = {
    chatMessages: number;
    auditLogs: number;
};
export type RefundRequestCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chatMessages?: boolean | RefundRequestCountOutputTypeCountChatMessagesArgs;
    auditLogs?: boolean | RefundRequestCountOutputTypeCountAuditLogsArgs;
};
export type RefundRequestCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundRequestCountOutputTypeSelect<ExtArgs> | null;
};
export type RefundRequestCountOutputTypeCountChatMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatMessageWhereInput;
};
export type RefundRequestCountOutputTypeCountAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
};
export type RefundRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    customerId?: boolean;
    orderId?: boolean;
    reason?: boolean;
    description?: boolean;
    amount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    chatMessages?: boolean | Prisma.RefundRequest$chatMessagesArgs<ExtArgs>;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    decision?: boolean | Prisma.RefundRequest$decisionArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.RefundRequest$auditLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.RefundRequestCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["refundRequest"]>;
export type RefundRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    customerId?: boolean;
    orderId?: boolean;
    reason?: boolean;
    description?: boolean;
    amount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["refundRequest"]>;
export type RefundRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    customerId?: boolean;
    orderId?: boolean;
    reason?: boolean;
    description?: boolean;
    amount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["refundRequest"]>;
export type RefundRequestSelectScalar = {
    id?: boolean;
    customerId?: boolean;
    orderId?: boolean;
    reason?: boolean;
    description?: boolean;
    amount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type RefundRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "customerId" | "orderId" | "reason" | "description" | "amount" | "createdAt" | "updatedAt", ExtArgs["result"]["refundRequest"]>;
export type RefundRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chatMessages?: boolean | Prisma.RefundRequest$chatMessagesArgs<ExtArgs>;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    decision?: boolean | Prisma.RefundRequest$decisionArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.RefundRequest$auditLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.RefundRequestCountOutputTypeDefaultArgs<ExtArgs>;
};
export type RefundRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type RefundRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type $RefundRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RefundRequest";
    objects: {
        chatMessages: Prisma.$ChatMessagePayload<ExtArgs>[];
        customer: Prisma.$CustomerPayload<ExtArgs>;
        order: Prisma.$OrderPayload<ExtArgs>;
        decision: Prisma.$RefundDecisionPayload<ExtArgs> | null;
        auditLogs: Prisma.$AuditLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        customerId: string;
        orderId: string;
        reason: $Enums.RefundReason;
        description: string;
        amount: runtime.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["refundRequest"]>;
    composites: {};
};
export type RefundRequestGetPayload<S extends boolean | null | undefined | RefundRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RefundRequestPayload, S>;
export type RefundRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RefundRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RefundRequestCountAggregateInputType | true;
};
export interface RefundRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RefundRequest'];
        meta: {
            name: 'RefundRequest';
        };
    };
    findUnique<T extends RefundRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, RefundRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RefundRequestClient<runtime.Types.Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RefundRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RefundRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RefundRequestClient<runtime.Types.Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RefundRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, RefundRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__RefundRequestClient<runtime.Types.Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RefundRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RefundRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RefundRequestClient<runtime.Types.Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RefundRequestFindManyArgs>(args?: Prisma.SelectSubset<T, RefundRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RefundRequestCreateArgs>(args: Prisma.SelectSubset<T, RefundRequestCreateArgs<ExtArgs>>): Prisma.Prisma__RefundRequestClient<runtime.Types.Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RefundRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, RefundRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RefundRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RefundRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RefundRequestDeleteArgs>(args: Prisma.SelectSubset<T, RefundRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__RefundRequestClient<runtime.Types.Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RefundRequestUpdateArgs>(args: Prisma.SelectSubset<T, RefundRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__RefundRequestClient<runtime.Types.Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RefundRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, RefundRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RefundRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, RefundRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RefundRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RefundRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RefundRequestUpsertArgs>(args: Prisma.SelectSubset<T, RefundRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__RefundRequestClient<runtime.Types.Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RefundRequestCountArgs>(args?: Prisma.Subset<T, RefundRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RefundRequestCountAggregateOutputType> : number>;
    aggregate<T extends RefundRequestAggregateArgs>(args: Prisma.Subset<T, RefundRequestAggregateArgs>): Prisma.PrismaPromise<GetRefundRequestAggregateType<T>>;
    groupBy<T extends RefundRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RefundRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: RefundRequestGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RefundRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefundRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RefundRequestFieldRefs;
}
export interface Prisma__RefundRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    chatMessages<T extends Prisma.RefundRequest$chatMessagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RefundRequest$chatMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    customer<T extends Prisma.CustomerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CustomerDefaultArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    decision<T extends Prisma.RefundRequest$decisionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RefundRequest$decisionArgs<ExtArgs>>): Prisma.Prisma__RefundDecisionClient<runtime.Types.Result.GetResult<Prisma.$RefundDecisionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    auditLogs<T extends Prisma.RefundRequest$auditLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RefundRequest$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RefundRequestFieldRefs {
    readonly id: Prisma.FieldRef<"RefundRequest", 'String'>;
    readonly customerId: Prisma.FieldRef<"RefundRequest", 'String'>;
    readonly orderId: Prisma.FieldRef<"RefundRequest", 'String'>;
    readonly reason: Prisma.FieldRef<"RefundRequest", 'RefundReason'>;
    readonly description: Prisma.FieldRef<"RefundRequest", 'String'>;
    readonly amount: Prisma.FieldRef<"RefundRequest", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"RefundRequest", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"RefundRequest", 'DateTime'>;
}
export type RefundRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundRequestSelect<ExtArgs> | null;
    omit?: Prisma.RefundRequestOmit<ExtArgs> | null;
    include?: Prisma.RefundRequestInclude<ExtArgs> | null;
    where: Prisma.RefundRequestWhereUniqueInput;
};
export type RefundRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundRequestSelect<ExtArgs> | null;
    omit?: Prisma.RefundRequestOmit<ExtArgs> | null;
    include?: Prisma.RefundRequestInclude<ExtArgs> | null;
    where: Prisma.RefundRequestWhereUniqueInput;
};
export type RefundRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundRequestSelect<ExtArgs> | null;
    omit?: Prisma.RefundRequestOmit<ExtArgs> | null;
    include?: Prisma.RefundRequestInclude<ExtArgs> | null;
    where?: Prisma.RefundRequestWhereInput;
    orderBy?: Prisma.RefundRequestOrderByWithRelationInput | Prisma.RefundRequestOrderByWithRelationInput[];
    cursor?: Prisma.RefundRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefundRequestScalarFieldEnum | Prisma.RefundRequestScalarFieldEnum[];
};
export type RefundRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundRequestSelect<ExtArgs> | null;
    omit?: Prisma.RefundRequestOmit<ExtArgs> | null;
    include?: Prisma.RefundRequestInclude<ExtArgs> | null;
    where?: Prisma.RefundRequestWhereInput;
    orderBy?: Prisma.RefundRequestOrderByWithRelationInput | Prisma.RefundRequestOrderByWithRelationInput[];
    cursor?: Prisma.RefundRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefundRequestScalarFieldEnum | Prisma.RefundRequestScalarFieldEnum[];
};
export type RefundRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundRequestSelect<ExtArgs> | null;
    omit?: Prisma.RefundRequestOmit<ExtArgs> | null;
    include?: Prisma.RefundRequestInclude<ExtArgs> | null;
    where?: Prisma.RefundRequestWhereInput;
    orderBy?: Prisma.RefundRequestOrderByWithRelationInput | Prisma.RefundRequestOrderByWithRelationInput[];
    cursor?: Prisma.RefundRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefundRequestScalarFieldEnum | Prisma.RefundRequestScalarFieldEnum[];
};
export type RefundRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundRequestSelect<ExtArgs> | null;
    omit?: Prisma.RefundRequestOmit<ExtArgs> | null;
    include?: Prisma.RefundRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RefundRequestCreateInput, Prisma.RefundRequestUncheckedCreateInput>;
};
export type RefundRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RefundRequestCreateManyInput | Prisma.RefundRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RefundRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundRequestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RefundRequestOmit<ExtArgs> | null;
    data: Prisma.RefundRequestCreateManyInput | Prisma.RefundRequestCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RefundRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RefundRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundRequestSelect<ExtArgs> | null;
    omit?: Prisma.RefundRequestOmit<ExtArgs> | null;
    include?: Prisma.RefundRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RefundRequestUpdateInput, Prisma.RefundRequestUncheckedUpdateInput>;
    where: Prisma.RefundRequestWhereUniqueInput;
};
export type RefundRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RefundRequestUpdateManyMutationInput, Prisma.RefundRequestUncheckedUpdateManyInput>;
    where?: Prisma.RefundRequestWhereInput;
    limit?: number;
};
export type RefundRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RefundRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RefundRequestUpdateManyMutationInput, Prisma.RefundRequestUncheckedUpdateManyInput>;
    where?: Prisma.RefundRequestWhereInput;
    limit?: number;
    include?: Prisma.RefundRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RefundRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundRequestSelect<ExtArgs> | null;
    omit?: Prisma.RefundRequestOmit<ExtArgs> | null;
    include?: Prisma.RefundRequestInclude<ExtArgs> | null;
    where: Prisma.RefundRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.RefundRequestCreateInput, Prisma.RefundRequestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RefundRequestUpdateInput, Prisma.RefundRequestUncheckedUpdateInput>;
};
export type RefundRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundRequestSelect<ExtArgs> | null;
    omit?: Prisma.RefundRequestOmit<ExtArgs> | null;
    include?: Prisma.RefundRequestInclude<ExtArgs> | null;
    where: Prisma.RefundRequestWhereUniqueInput;
};
export type RefundRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefundRequestWhereInput;
    limit?: number;
};
export type RefundRequest$chatMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    where?: Prisma.ChatMessageWhereInput;
    orderBy?: Prisma.ChatMessageOrderByWithRelationInput | Prisma.ChatMessageOrderByWithRelationInput[];
    cursor?: Prisma.ChatMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChatMessageScalarFieldEnum | Prisma.ChatMessageScalarFieldEnum[];
};
export type RefundRequest$decisionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundDecisionSelect<ExtArgs> | null;
    omit?: Prisma.RefundDecisionOmit<ExtArgs> | null;
    include?: Prisma.RefundDecisionInclude<ExtArgs> | null;
    where?: Prisma.RefundDecisionWhereInput;
};
export type RefundRequest$auditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
export type RefundRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundRequestSelect<ExtArgs> | null;
    omit?: Prisma.RefundRequestOmit<ExtArgs> | null;
    include?: Prisma.RefundRequestInclude<ExtArgs> | null;
};
