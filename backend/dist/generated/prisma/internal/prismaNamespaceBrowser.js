import * as runtime from "@prisma/client/runtime/index-browser";
export const Decimal = runtime.Decimal;
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
    ChatMessage: 'ChatMessage',
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
    isFinalSale: 'isFinalSale'
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
export const ChatMessageScalarFieldEnum = {
    id: 'id',
    refundRequestId: 'refundRequestId',
    role: 'role',
    content: 'content',
    metadata: 'metadata',
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
//# sourceMappingURL=prismaNamespaceBrowser.js.map