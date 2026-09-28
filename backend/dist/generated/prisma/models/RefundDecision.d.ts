import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RefundDecisionModel = runtime.Types.Result.DefaultSelection<Prisma.$RefundDecisionPayload>;
export type AggregateRefundDecision = {
    _count: RefundDecisionCountAggregateOutputType | null;
    _avg: RefundDecisionAvgAggregateOutputType | null;
    _sum: RefundDecisionSumAggregateOutputType | null;
    _min: RefundDecisionMinAggregateOutputType | null;
    _max: RefundDecisionMaxAggregateOutputType | null;
};
export type RefundDecisionAvgAggregateOutputType = {
    confidence: number | null;
};
export type RefundDecisionSumAggregateOutputType = {
    confidence: number | null;
};
export type RefundDecisionMinAggregateOutputType = {
    id: string | null;
    refundRequestId: string | null;
    status: $Enums.RefundStatus | null;
    source: $Enums.DecisionSource | null;
    reason: string | null;
    confidence: number | null;
    createdAt: Date | null;
};
export type RefundDecisionMaxAggregateOutputType = {
    id: string | null;
    refundRequestId: string | null;
    status: $Enums.RefundStatus | null;
    source: $Enums.DecisionSource | null;
    reason: string | null;
    confidence: number | null;
    createdAt: Date | null;
};
export type RefundDecisionCountAggregateOutputType = {
    id: number;
    refundRequestId: number;
    status: number;
    source: number;
    reason: number;
    confidence: number;
    createdAt: number;
    _all: number;
};
export type RefundDecisionAvgAggregateInputType = {
    confidence?: true;
};
export type RefundDecisionSumAggregateInputType = {
    confidence?: true;
};
export type RefundDecisionMinAggregateInputType = {
    id?: true;
    refundRequestId?: true;
    status?: true;
    source?: true;
    reason?: true;
    confidence?: true;
    createdAt?: true;
};
export type RefundDecisionMaxAggregateInputType = {
    id?: true;
    refundRequestId?: true;
    status?: true;
    source?: true;
    reason?: true;
    confidence?: true;
    createdAt?: true;
};
export type RefundDecisionCountAggregateInputType = {
    id?: true;
    refundRequestId?: true;
    status?: true;
    source?: true;
    reason?: true;
    confidence?: true;
    createdAt?: true;
    _all?: true;
};
export type RefundDecisionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefundDecisionWhereInput;
    orderBy?: Prisma.RefundDecisionOrderByWithRelationInput | Prisma.RefundDecisionOrderByWithRelationInput[];
    cursor?: Prisma.RefundDecisionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RefundDecisionCountAggregateInputType;
    _avg?: RefundDecisionAvgAggregateInputType;
    _sum?: RefundDecisionSumAggregateInputType;
    _min?: RefundDecisionMinAggregateInputType;
    _max?: RefundDecisionMaxAggregateInputType;
};
export type GetRefundDecisionAggregateType<T extends RefundDecisionAggregateArgs> = {
    [P in keyof T & keyof AggregateRefundDecision]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRefundDecision[P]> : Prisma.GetScalarType<T[P], AggregateRefundDecision[P]>;
};
export type RefundDecisionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefundDecisionWhereInput;
    orderBy?: Prisma.RefundDecisionOrderByWithAggregationInput | Prisma.RefundDecisionOrderByWithAggregationInput[];
    by: Prisma.RefundDecisionScalarFieldEnum[] | Prisma.RefundDecisionScalarFieldEnum;
    having?: Prisma.RefundDecisionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RefundDecisionCountAggregateInputType | true;
    _avg?: RefundDecisionAvgAggregateInputType;
    _sum?: RefundDecisionSumAggregateInputType;
    _min?: RefundDecisionMinAggregateInputType;
    _max?: RefundDecisionMaxAggregateInputType;
};
export type RefundDecisionGroupByOutputType = {
    id: string;
    refundRequestId: string;
    status: $Enums.RefundStatus;
    source: $Enums.DecisionSource;
    reason: string;
    confidence: number | null;
    createdAt: Date;
    _count: RefundDecisionCountAggregateOutputType | null;
    _avg: RefundDecisionAvgAggregateOutputType | null;
    _sum: RefundDecisionSumAggregateOutputType | null;
    _min: RefundDecisionMinAggregateOutputType | null;
    _max: RefundDecisionMaxAggregateOutputType | null;
};
export type GetRefundDecisionGroupByPayload<T extends RefundDecisionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RefundDecisionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RefundDecisionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RefundDecisionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RefundDecisionGroupByOutputType[P]>;
}>>;
export type RefundDecisionWhereInput = {
    AND?: Prisma.RefundDecisionWhereInput | Prisma.RefundDecisionWhereInput[];
    OR?: Prisma.RefundDecisionWhereInput[];
    NOT?: Prisma.RefundDecisionWhereInput | Prisma.RefundDecisionWhereInput[];
    id?: Prisma.StringFilter<"RefundDecision"> | string;
    refundRequestId?: Prisma.StringFilter<"RefundDecision"> | string;
    status?: Prisma.EnumRefundStatusFilter<"RefundDecision"> | $Enums.RefundStatus;
    source?: Prisma.EnumDecisionSourceFilter<"RefundDecision"> | $Enums.DecisionSource;
    reason?: Prisma.StringFilter<"RefundDecision"> | string;
    confidence?: Prisma.FloatNullableFilter<"RefundDecision"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"RefundDecision"> | Date | string;
    refundRequest?: Prisma.XOR<Prisma.RefundRequestScalarRelationFilter, Prisma.RefundRequestWhereInput>;
};
export type RefundDecisionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    refundRequestId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    confidence?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    refundRequest?: Prisma.RefundRequestOrderByWithRelationInput;
};
export type RefundDecisionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    refundRequestId?: string;
    AND?: Prisma.RefundDecisionWhereInput | Prisma.RefundDecisionWhereInput[];
    OR?: Prisma.RefundDecisionWhereInput[];
    NOT?: Prisma.RefundDecisionWhereInput | Prisma.RefundDecisionWhereInput[];
    status?: Prisma.EnumRefundStatusFilter<"RefundDecision"> | $Enums.RefundStatus;
    source?: Prisma.EnumDecisionSourceFilter<"RefundDecision"> | $Enums.DecisionSource;
    reason?: Prisma.StringFilter<"RefundDecision"> | string;
    confidence?: Prisma.FloatNullableFilter<"RefundDecision"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"RefundDecision"> | Date | string;
    refundRequest?: Prisma.XOR<Prisma.RefundRequestScalarRelationFilter, Prisma.RefundRequestWhereInput>;
}, "id" | "refundRequestId">;
export type RefundDecisionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    refundRequestId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    confidence?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.RefundDecisionCountOrderByAggregateInput;
    _avg?: Prisma.RefundDecisionAvgOrderByAggregateInput;
    _max?: Prisma.RefundDecisionMaxOrderByAggregateInput;
    _min?: Prisma.RefundDecisionMinOrderByAggregateInput;
    _sum?: Prisma.RefundDecisionSumOrderByAggregateInput;
};
export type RefundDecisionScalarWhereWithAggregatesInput = {
    AND?: Prisma.RefundDecisionScalarWhereWithAggregatesInput | Prisma.RefundDecisionScalarWhereWithAggregatesInput[];
    OR?: Prisma.RefundDecisionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RefundDecisionScalarWhereWithAggregatesInput | Prisma.RefundDecisionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RefundDecision"> | string;
    refundRequestId?: Prisma.StringWithAggregatesFilter<"RefundDecision"> | string;
    status?: Prisma.EnumRefundStatusWithAggregatesFilter<"RefundDecision"> | $Enums.RefundStatus;
    source?: Prisma.EnumDecisionSourceWithAggregatesFilter<"RefundDecision"> | $Enums.DecisionSource;
    reason?: Prisma.StringWithAggregatesFilter<"RefundDecision"> | string;
    confidence?: Prisma.FloatNullableWithAggregatesFilter<"RefundDecision"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RefundDecision"> | Date | string;
};
export type RefundDecisionCreateInput = {
    id?: string;
    status: $Enums.RefundStatus;
    source: $Enums.DecisionSource;
    reason: string;
    confidence?: number | null;
    createdAt?: Date | string;
    refundRequest: Prisma.RefundRequestCreateNestedOneWithoutDecisionInput;
};
export type RefundDecisionUncheckedCreateInput = {
    id?: string;
    refundRequestId: string;
    status: $Enums.RefundStatus;
    source: $Enums.DecisionSource;
    reason: string;
    confidence?: number | null;
    createdAt?: Date | string;
};
export type RefundDecisionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus;
    source?: Prisma.EnumDecisionSourceFieldUpdateOperationsInput | $Enums.DecisionSource;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refundRequest?: Prisma.RefundRequestUpdateOneRequiredWithoutDecisionNestedInput;
};
export type RefundDecisionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    refundRequestId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus;
    source?: Prisma.EnumDecisionSourceFieldUpdateOperationsInput | $Enums.DecisionSource;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefundDecisionCreateManyInput = {
    id?: string;
    refundRequestId: string;
    status: $Enums.RefundStatus;
    source: $Enums.DecisionSource;
    reason: string;
    confidence?: number | null;
    createdAt?: Date | string;
};
export type RefundDecisionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus;
    source?: Prisma.EnumDecisionSourceFieldUpdateOperationsInput | $Enums.DecisionSource;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefundDecisionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    refundRequestId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus;
    source?: Prisma.EnumDecisionSourceFieldUpdateOperationsInput | $Enums.DecisionSource;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefundDecisionNullableScalarRelationFilter = {
    is?: Prisma.RefundDecisionWhereInput | null;
    isNot?: Prisma.RefundDecisionWhereInput | null;
};
export type RefundDecisionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    refundRequestId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RefundDecisionAvgOrderByAggregateInput = {
    confidence?: Prisma.SortOrder;
};
export type RefundDecisionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    refundRequestId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RefundDecisionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    refundRequestId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RefundDecisionSumOrderByAggregateInput = {
    confidence?: Prisma.SortOrder;
};
export type RefundDecisionCreateNestedOneWithoutRefundRequestInput = {
    create?: Prisma.XOR<Prisma.RefundDecisionCreateWithoutRefundRequestInput, Prisma.RefundDecisionUncheckedCreateWithoutRefundRequestInput>;
    connectOrCreate?: Prisma.RefundDecisionCreateOrConnectWithoutRefundRequestInput;
    connect?: Prisma.RefundDecisionWhereUniqueInput;
};
export type RefundDecisionUncheckedCreateNestedOneWithoutRefundRequestInput = {
    create?: Prisma.XOR<Prisma.RefundDecisionCreateWithoutRefundRequestInput, Prisma.RefundDecisionUncheckedCreateWithoutRefundRequestInput>;
    connectOrCreate?: Prisma.RefundDecisionCreateOrConnectWithoutRefundRequestInput;
    connect?: Prisma.RefundDecisionWhereUniqueInput;
};
export type RefundDecisionUpdateOneWithoutRefundRequestNestedInput = {
    create?: Prisma.XOR<Prisma.RefundDecisionCreateWithoutRefundRequestInput, Prisma.RefundDecisionUncheckedCreateWithoutRefundRequestInput>;
    connectOrCreate?: Prisma.RefundDecisionCreateOrConnectWithoutRefundRequestInput;
    upsert?: Prisma.RefundDecisionUpsertWithoutRefundRequestInput;
    disconnect?: Prisma.RefundDecisionWhereInput | boolean;
    delete?: Prisma.RefundDecisionWhereInput | boolean;
    connect?: Prisma.RefundDecisionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RefundDecisionUpdateToOneWithWhereWithoutRefundRequestInput, Prisma.RefundDecisionUpdateWithoutRefundRequestInput>, Prisma.RefundDecisionUncheckedUpdateWithoutRefundRequestInput>;
};
export type RefundDecisionUncheckedUpdateOneWithoutRefundRequestNestedInput = {
    create?: Prisma.XOR<Prisma.RefundDecisionCreateWithoutRefundRequestInput, Prisma.RefundDecisionUncheckedCreateWithoutRefundRequestInput>;
    connectOrCreate?: Prisma.RefundDecisionCreateOrConnectWithoutRefundRequestInput;
    upsert?: Prisma.RefundDecisionUpsertWithoutRefundRequestInput;
    disconnect?: Prisma.RefundDecisionWhereInput | boolean;
    delete?: Prisma.RefundDecisionWhereInput | boolean;
    connect?: Prisma.RefundDecisionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RefundDecisionUpdateToOneWithWhereWithoutRefundRequestInput, Prisma.RefundDecisionUpdateWithoutRefundRequestInput>, Prisma.RefundDecisionUncheckedUpdateWithoutRefundRequestInput>;
};
export type EnumRefundStatusFieldUpdateOperationsInput = {
    set?: $Enums.RefundStatus;
};
export type EnumDecisionSourceFieldUpdateOperationsInput = {
    set?: $Enums.DecisionSource;
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type RefundDecisionCreateWithoutRefundRequestInput = {
    id?: string;
    status: $Enums.RefundStatus;
    source: $Enums.DecisionSource;
    reason: string;
    confidence?: number | null;
    createdAt?: Date | string;
};
export type RefundDecisionUncheckedCreateWithoutRefundRequestInput = {
    id?: string;
    status: $Enums.RefundStatus;
    source: $Enums.DecisionSource;
    reason: string;
    confidence?: number | null;
    createdAt?: Date | string;
};
export type RefundDecisionCreateOrConnectWithoutRefundRequestInput = {
    where: Prisma.RefundDecisionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RefundDecisionCreateWithoutRefundRequestInput, Prisma.RefundDecisionUncheckedCreateWithoutRefundRequestInput>;
};
export type RefundDecisionUpsertWithoutRefundRequestInput = {
    update: Prisma.XOR<Prisma.RefundDecisionUpdateWithoutRefundRequestInput, Prisma.RefundDecisionUncheckedUpdateWithoutRefundRequestInput>;
    create: Prisma.XOR<Prisma.RefundDecisionCreateWithoutRefundRequestInput, Prisma.RefundDecisionUncheckedCreateWithoutRefundRequestInput>;
    where?: Prisma.RefundDecisionWhereInput;
};
export type RefundDecisionUpdateToOneWithWhereWithoutRefundRequestInput = {
    where?: Prisma.RefundDecisionWhereInput;
    data: Prisma.XOR<Prisma.RefundDecisionUpdateWithoutRefundRequestInput, Prisma.RefundDecisionUncheckedUpdateWithoutRefundRequestInput>;
};
export type RefundDecisionUpdateWithoutRefundRequestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus;
    source?: Prisma.EnumDecisionSourceFieldUpdateOperationsInput | $Enums.DecisionSource;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefundDecisionUncheckedUpdateWithoutRefundRequestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus;
    source?: Prisma.EnumDecisionSourceFieldUpdateOperationsInput | $Enums.DecisionSource;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefundDecisionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    refundRequestId?: boolean;
    status?: boolean;
    source?: boolean;
    reason?: boolean;
    confidence?: boolean;
    createdAt?: boolean;
    refundRequest?: boolean | Prisma.RefundRequestDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["refundDecision"]>;
export type RefundDecisionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    refundRequestId?: boolean;
    status?: boolean;
    source?: boolean;
    reason?: boolean;
    confidence?: boolean;
    createdAt?: boolean;
    refundRequest?: boolean | Prisma.RefundRequestDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["refundDecision"]>;
export type RefundDecisionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    refundRequestId?: boolean;
    status?: boolean;
    source?: boolean;
    reason?: boolean;
    confidence?: boolean;
    createdAt?: boolean;
    refundRequest?: boolean | Prisma.RefundRequestDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["refundDecision"]>;
export type RefundDecisionSelectScalar = {
    id?: boolean;
    refundRequestId?: boolean;
    status?: boolean;
    source?: boolean;
    reason?: boolean;
    confidence?: boolean;
    createdAt?: boolean;
};
export type RefundDecisionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "refundRequestId" | "status" | "source" | "reason" | "confidence" | "createdAt", ExtArgs["result"]["refundDecision"]>;
export type RefundDecisionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    refundRequest?: boolean | Prisma.RefundRequestDefaultArgs<ExtArgs>;
};
export type RefundDecisionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    refundRequest?: boolean | Prisma.RefundRequestDefaultArgs<ExtArgs>;
};
export type RefundDecisionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    refundRequest?: boolean | Prisma.RefundRequestDefaultArgs<ExtArgs>;
};
export type $RefundDecisionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RefundDecision";
    objects: {
        refundRequest: Prisma.$RefundRequestPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        refundRequestId: string;
        status: $Enums.RefundStatus;
        source: $Enums.DecisionSource;
        reason: string;
        confidence: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["refundDecision"]>;
    composites: {};
};
export type RefundDecisionGetPayload<S extends boolean | null | undefined | RefundDecisionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RefundDecisionPayload, S>;
export type RefundDecisionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RefundDecisionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RefundDecisionCountAggregateInputType | true;
};
export interface RefundDecisionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RefundDecision'];
        meta: {
            name: 'RefundDecision';
        };
    };
    findUnique<T extends RefundDecisionFindUniqueArgs>(args: Prisma.SelectSubset<T, RefundDecisionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RefundDecisionClient<runtime.Types.Result.GetResult<Prisma.$RefundDecisionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RefundDecisionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RefundDecisionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RefundDecisionClient<runtime.Types.Result.GetResult<Prisma.$RefundDecisionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RefundDecisionFindFirstArgs>(args?: Prisma.SelectSubset<T, RefundDecisionFindFirstArgs<ExtArgs>>): Prisma.Prisma__RefundDecisionClient<runtime.Types.Result.GetResult<Prisma.$RefundDecisionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RefundDecisionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RefundDecisionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RefundDecisionClient<runtime.Types.Result.GetResult<Prisma.$RefundDecisionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RefundDecisionFindManyArgs>(args?: Prisma.SelectSubset<T, RefundDecisionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefundDecisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RefundDecisionCreateArgs>(args: Prisma.SelectSubset<T, RefundDecisionCreateArgs<ExtArgs>>): Prisma.Prisma__RefundDecisionClient<runtime.Types.Result.GetResult<Prisma.$RefundDecisionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RefundDecisionCreateManyArgs>(args?: Prisma.SelectSubset<T, RefundDecisionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RefundDecisionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RefundDecisionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefundDecisionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RefundDecisionDeleteArgs>(args: Prisma.SelectSubset<T, RefundDecisionDeleteArgs<ExtArgs>>): Prisma.Prisma__RefundDecisionClient<runtime.Types.Result.GetResult<Prisma.$RefundDecisionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RefundDecisionUpdateArgs>(args: Prisma.SelectSubset<T, RefundDecisionUpdateArgs<ExtArgs>>): Prisma.Prisma__RefundDecisionClient<runtime.Types.Result.GetResult<Prisma.$RefundDecisionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RefundDecisionDeleteManyArgs>(args?: Prisma.SelectSubset<T, RefundDecisionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RefundDecisionUpdateManyArgs>(args: Prisma.SelectSubset<T, RefundDecisionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RefundDecisionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RefundDecisionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefundDecisionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RefundDecisionUpsertArgs>(args: Prisma.SelectSubset<T, RefundDecisionUpsertArgs<ExtArgs>>): Prisma.Prisma__RefundDecisionClient<runtime.Types.Result.GetResult<Prisma.$RefundDecisionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RefundDecisionCountArgs>(args?: Prisma.Subset<T, RefundDecisionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RefundDecisionCountAggregateOutputType> : number>;
    aggregate<T extends RefundDecisionAggregateArgs>(args: Prisma.Subset<T, RefundDecisionAggregateArgs>): Prisma.PrismaPromise<GetRefundDecisionAggregateType<T>>;
    groupBy<T extends RefundDecisionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RefundDecisionGroupByArgs['orderBy'];
    } : {
        orderBy?: RefundDecisionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RefundDecisionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefundDecisionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RefundDecisionFieldRefs;
}
export interface Prisma__RefundDecisionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    refundRequest<T extends Prisma.RefundRequestDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RefundRequestDefaultArgs<ExtArgs>>): Prisma.Prisma__RefundRequestClient<runtime.Types.Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RefundDecisionFieldRefs {
    readonly id: Prisma.FieldRef<"RefundDecision", 'String'>;
    readonly refundRequestId: Prisma.FieldRef<"RefundDecision", 'String'>;
    readonly status: Prisma.FieldRef<"RefundDecision", 'RefundStatus'>;
    readonly source: Prisma.FieldRef<"RefundDecision", 'DecisionSource'>;
    readonly reason: Prisma.FieldRef<"RefundDecision", 'String'>;
    readonly confidence: Prisma.FieldRef<"RefundDecision", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"RefundDecision", 'DateTime'>;
}
export type RefundDecisionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundDecisionSelect<ExtArgs> | null;
    omit?: Prisma.RefundDecisionOmit<ExtArgs> | null;
    include?: Prisma.RefundDecisionInclude<ExtArgs> | null;
    where: Prisma.RefundDecisionWhereUniqueInput;
};
export type RefundDecisionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundDecisionSelect<ExtArgs> | null;
    omit?: Prisma.RefundDecisionOmit<ExtArgs> | null;
    include?: Prisma.RefundDecisionInclude<ExtArgs> | null;
    where: Prisma.RefundDecisionWhereUniqueInput;
};
export type RefundDecisionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundDecisionSelect<ExtArgs> | null;
    omit?: Prisma.RefundDecisionOmit<ExtArgs> | null;
    include?: Prisma.RefundDecisionInclude<ExtArgs> | null;
    where?: Prisma.RefundDecisionWhereInput;
    orderBy?: Prisma.RefundDecisionOrderByWithRelationInput | Prisma.RefundDecisionOrderByWithRelationInput[];
    cursor?: Prisma.RefundDecisionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefundDecisionScalarFieldEnum | Prisma.RefundDecisionScalarFieldEnum[];
};
export type RefundDecisionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundDecisionSelect<ExtArgs> | null;
    omit?: Prisma.RefundDecisionOmit<ExtArgs> | null;
    include?: Prisma.RefundDecisionInclude<ExtArgs> | null;
    where?: Prisma.RefundDecisionWhereInput;
    orderBy?: Prisma.RefundDecisionOrderByWithRelationInput | Prisma.RefundDecisionOrderByWithRelationInput[];
    cursor?: Prisma.RefundDecisionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefundDecisionScalarFieldEnum | Prisma.RefundDecisionScalarFieldEnum[];
};
export type RefundDecisionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundDecisionSelect<ExtArgs> | null;
    omit?: Prisma.RefundDecisionOmit<ExtArgs> | null;
    include?: Prisma.RefundDecisionInclude<ExtArgs> | null;
    where?: Prisma.RefundDecisionWhereInput;
    orderBy?: Prisma.RefundDecisionOrderByWithRelationInput | Prisma.RefundDecisionOrderByWithRelationInput[];
    cursor?: Prisma.RefundDecisionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefundDecisionScalarFieldEnum | Prisma.RefundDecisionScalarFieldEnum[];
};
export type RefundDecisionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundDecisionSelect<ExtArgs> | null;
    omit?: Prisma.RefundDecisionOmit<ExtArgs> | null;
    include?: Prisma.RefundDecisionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RefundDecisionCreateInput, Prisma.RefundDecisionUncheckedCreateInput>;
};
export type RefundDecisionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RefundDecisionCreateManyInput | Prisma.RefundDecisionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RefundDecisionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundDecisionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RefundDecisionOmit<ExtArgs> | null;
    data: Prisma.RefundDecisionCreateManyInput | Prisma.RefundDecisionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RefundDecisionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RefundDecisionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundDecisionSelect<ExtArgs> | null;
    omit?: Prisma.RefundDecisionOmit<ExtArgs> | null;
    include?: Prisma.RefundDecisionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RefundDecisionUpdateInput, Prisma.RefundDecisionUncheckedUpdateInput>;
    where: Prisma.RefundDecisionWhereUniqueInput;
};
export type RefundDecisionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RefundDecisionUpdateManyMutationInput, Prisma.RefundDecisionUncheckedUpdateManyInput>;
    where?: Prisma.RefundDecisionWhereInput;
    limit?: number;
};
export type RefundDecisionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundDecisionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RefundDecisionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RefundDecisionUpdateManyMutationInput, Prisma.RefundDecisionUncheckedUpdateManyInput>;
    where?: Prisma.RefundDecisionWhereInput;
    limit?: number;
    include?: Prisma.RefundDecisionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RefundDecisionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundDecisionSelect<ExtArgs> | null;
    omit?: Prisma.RefundDecisionOmit<ExtArgs> | null;
    include?: Prisma.RefundDecisionInclude<ExtArgs> | null;
    where: Prisma.RefundDecisionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RefundDecisionCreateInput, Prisma.RefundDecisionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RefundDecisionUpdateInput, Prisma.RefundDecisionUncheckedUpdateInput>;
};
export type RefundDecisionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundDecisionSelect<ExtArgs> | null;
    omit?: Prisma.RefundDecisionOmit<ExtArgs> | null;
    include?: Prisma.RefundDecisionInclude<ExtArgs> | null;
    where: Prisma.RefundDecisionWhereUniqueInput;
};
export type RefundDecisionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefundDecisionWhereInput;
    limit?: number;
};
export type RefundDecisionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefundDecisionSelect<ExtArgs> | null;
    omit?: Prisma.RefundDecisionOmit<ExtArgs> | null;
    include?: Prisma.RefundDecisionInclude<ExtArgs> | null;
};
