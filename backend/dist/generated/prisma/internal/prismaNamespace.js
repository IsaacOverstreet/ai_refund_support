import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "7.10.0",
    engine: "0edf323efd1d98336f3f0a68684b56f689b900d3"
};
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    Customer: 'Customer',
    Product: 'Product',
    Order: 'Order',
    OrderItem: 'OrderItem',
    RefundRequest: 'RefundRequest',
    RefundDecision: 'RefundDecision',
    AuditLog: 'AuditLog'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const CustomerScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ProductScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    sku: 'sku',
    price: 'price',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const OrderScalarFieldEnum = {
    id: 'id',
    orderNumber: 'orderNumber',
    customerId: 'customerId',
    status: 'status',
    totalAmount: 'totalAmount',
    orderedAt: 'orderedAt',
    deliveredAt: 'deliveredAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const OrderItemScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    size: 'size',
    color: 'color'
};
export const RefundRequestScalarFieldEnum = {
    id: 'id',
    customerId: 'customerId',
    orderId: 'orderId',
    reason: 'reason',
    description: 'description',
    amount: 'amount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const RefundDecisionScalarFieldEnum = {
    id: 'id',
    refundRequestId: 'refundRequestId',
    status: 'status',
    source: 'source',
    reason: 'reason',
    confidence: 'confidence',
    createdAt: 'createdAt'
};
export const AuditLogScalarFieldEnum = {
    id: 'id',
    refundRequestId: 'refundRequestId',
    action: 'action',
    details: 'details',
    createdAt: 'createdAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const NullableJsonNullValueInput = {
    DbNull: DbNull,
    JsonNull: JsonNull
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const JsonNullValueFilter = {
    DbNull: DbNull,
    JsonNull: JsonNull,
    AnyNull: AnyNull
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map