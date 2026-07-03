
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Shop
 * 
 */
export type Shop = $Result.DefaultSelection<Prisma.$ShopPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model Reminder
 * 
 */
export type Reminder = $Result.DefaultSelection<Prisma.$ReminderPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model CustomerTag
 * 
 */
export type CustomerTag = $Result.DefaultSelection<Prisma.$CustomerTagPayload>
/**
 * Model TransactionNote
 * 
 */
export type TransactionNote = $Result.DefaultSelection<Prisma.$TransactionNotePayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TransactionType: {
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT',
  PAYMENT: 'PAYMENT'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const PaymentMethod: {
  CASH: 'CASH',
  UPI: 'UPI',
  BANK_TRANSFER: 'BANK_TRANSFER',
  CHEQUE: 'CHEQUE',
  OTHER: 'OTHER'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]


export const SubscriptionPlan: {
  FREE: 'FREE',
  BASIC: 'BASIC',
  PRO: 'PRO',
  ENTERPRISE: 'ENTERPRISE'
};

export type SubscriptionPlan = (typeof SubscriptionPlan)[keyof typeof SubscriptionPlan]


export const SubscriptionStatus: {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
  PAST_DUE: 'PAST_DUE'
};

export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]


export const ReminderStatus: {
  PENDING: 'PENDING',
  SENT: 'SENT',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export type ReminderStatus = (typeof ReminderStatus)[keyof typeof ReminderStatus]


export const ReminderChannel: {
  SMS: 'SMS',
  WHATSAPP: 'WHATSAPP',
  EMAIL: 'EMAIL'
};

export type ReminderChannel = (typeof ReminderChannel)[keyof typeof ReminderChannel]

}

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

export type SubscriptionPlan = $Enums.SubscriptionPlan

export const SubscriptionPlan: typeof $Enums.SubscriptionPlan

export type SubscriptionStatus = $Enums.SubscriptionStatus

export const SubscriptionStatus: typeof $Enums.SubscriptionStatus

export type ReminderStatus = $Enums.ReminderStatus

export const ReminderStatus: typeof $Enums.ReminderStatus

export type ReminderChannel = $Enums.ReminderChannel

export const ReminderChannel: typeof $Enums.ReminderChannel

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Shops
 * const shops = await prisma.shop.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Shops
   * const shops = await prisma.shop.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.shop`: Exposes CRUD operations for the **Shop** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shops
    * const shops = await prisma.shop.findMany()
    * ```
    */
  get shop(): Prisma.ShopDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reminder`: Exposes CRUD operations for the **Reminder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reminders
    * const reminders = await prisma.reminder.findMany()
    * ```
    */
  get reminder(): Prisma.ReminderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customerTag`: Exposes CRUD operations for the **CustomerTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerTags
    * const customerTags = await prisma.customerTag.findMany()
    * ```
    */
  get customerTag(): Prisma.CustomerTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transactionNote`: Exposes CRUD operations for the **TransactionNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TransactionNotes
    * const transactionNotes = await prisma.transactionNote.findMany()
    * ```
    */
  get transactionNote(): Prisma.TransactionNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Shop: 'Shop',
    User: 'User',
    Customer: 'Customer',
    Transaction: 'Transaction',
    Subscription: 'Subscription',
    Reminder: 'Reminder',
    AuditLog: 'AuditLog',
    Tag: 'Tag',
    CustomerTag: 'CustomerTag',
    TransactionNote: 'TransactionNote',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "shop" | "user" | "customer" | "transaction" | "subscription" | "reminder" | "auditLog" | "tag" | "customerTag" | "transactionNote" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Shop: {
        payload: Prisma.$ShopPayload<ExtArgs>
        fields: Prisma.ShopFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShopFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShopFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          findFirst: {
            args: Prisma.ShopFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShopFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          findMany: {
            args: Prisma.ShopFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>[]
          }
          create: {
            args: Prisma.ShopCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          createMany: {
            args: Prisma.ShopCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShopCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>[]
          }
          delete: {
            args: Prisma.ShopDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          update: {
            args: Prisma.ShopUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          deleteMany: {
            args: Prisma.ShopDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShopUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShopUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>[]
          }
          upsert: {
            args: Prisma.ShopUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          aggregate: {
            args: Prisma.ShopAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShop>
          }
          groupBy: {
            args: Prisma.ShopGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShopGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShopCountArgs<ExtArgs>
            result: $Utils.Optional<ShopCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      Reminder: {
        payload: Prisma.$ReminderPayload<ExtArgs>
        fields: Prisma.ReminderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReminderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReminderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          findFirst: {
            args: Prisma.ReminderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReminderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          findMany: {
            args: Prisma.ReminderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>[]
          }
          create: {
            args: Prisma.ReminderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          createMany: {
            args: Prisma.ReminderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReminderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>[]
          }
          delete: {
            args: Prisma.ReminderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          update: {
            args: Prisma.ReminderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          deleteMany: {
            args: Prisma.ReminderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReminderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReminderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>[]
          }
          upsert: {
            args: Prisma.ReminderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          aggregate: {
            args: Prisma.ReminderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReminder>
          }
          groupBy: {
            args: Prisma.ReminderGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReminderGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReminderCountArgs<ExtArgs>
            result: $Utils.Optional<ReminderCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      CustomerTag: {
        payload: Prisma.$CustomerTagPayload<ExtArgs>
        fields: Prisma.CustomerTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTagPayload>
          }
          findFirst: {
            args: Prisma.CustomerTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTagPayload>
          }
          findMany: {
            args: Prisma.CustomerTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTagPayload>[]
          }
          create: {
            args: Prisma.CustomerTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTagPayload>
          }
          createMany: {
            args: Prisma.CustomerTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTagPayload>[]
          }
          delete: {
            args: Prisma.CustomerTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTagPayload>
          }
          update: {
            args: Prisma.CustomerTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTagPayload>
          }
          deleteMany: {
            args: Prisma.CustomerTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTagPayload>[]
          }
          upsert: {
            args: Prisma.CustomerTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerTagPayload>
          }
          aggregate: {
            args: Prisma.CustomerTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerTag>
          }
          groupBy: {
            args: Prisma.CustomerTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerTagCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerTagCountAggregateOutputType> | number
          }
        }
      }
      TransactionNote: {
        payload: Prisma.$TransactionNotePayload<ExtArgs>
        fields: Prisma.TransactionNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionNotePayload>
          }
          findFirst: {
            args: Prisma.TransactionNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionNotePayload>
          }
          findMany: {
            args: Prisma.TransactionNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionNotePayload>[]
          }
          create: {
            args: Prisma.TransactionNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionNotePayload>
          }
          createMany: {
            args: Prisma.TransactionNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionNotePayload>[]
          }
          delete: {
            args: Prisma.TransactionNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionNotePayload>
          }
          update: {
            args: Prisma.TransactionNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionNotePayload>
          }
          deleteMany: {
            args: Prisma.TransactionNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionNotePayload>[]
          }
          upsert: {
            args: Prisma.TransactionNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionNotePayload>
          }
          aggregate: {
            args: Prisma.TransactionNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransactionNote>
          }
          groupBy: {
            args: Prisma.TransactionNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionNoteCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionNoteCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    shop?: ShopOmit
    user?: UserOmit
    customer?: CustomerOmit
    transaction?: TransactionOmit
    subscription?: SubscriptionOmit
    reminder?: ReminderOmit
    auditLog?: AuditLogOmit
    tag?: TagOmit
    customerTag?: CustomerTagOmit
    transactionNote?: TransactionNoteOmit
    notification?: NotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ShopCountOutputType
   */

  export type ShopCountOutputType = {
    users: number
    customers: number
    transactions: number
    subscriptions: number
    reminders: number
    notifications: number
  }

  export type ShopCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | ShopCountOutputTypeCountUsersArgs
    customers?: boolean | ShopCountOutputTypeCountCustomersArgs
    transactions?: boolean | ShopCountOutputTypeCountTransactionsArgs
    subscriptions?: boolean | ShopCountOutputTypeCountSubscriptionsArgs
    reminders?: boolean | ShopCountOutputTypeCountRemindersArgs
    notifications?: boolean | ShopCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopCountOutputType
     */
    select?: ShopCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeCountCustomersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
  }

  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }

  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeCountRemindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReminderWhereInput
  }

  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    createdTransactions: number
    createdReminders: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdTransactions?: boolean | UserCountOutputTypeCountCreatedTransactionsArgs
    createdReminders?: boolean | UserCountOutputTypeCountCreatedRemindersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedRemindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReminderWhereInput
  }


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    transactions: number
    reminders: number
    tags: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | CustomerCountOutputTypeCountTransactionsArgs
    reminders?: boolean | CustomerCountOutputTypeCountRemindersArgs
    tags?: boolean | CustomerCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountRemindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReminderWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerTagWhereInput
  }


  /**
   * Count Type TransactionCountOutputType
   */

  export type TransactionCountOutputType = {
    notes: number
  }

  export type TransactionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | TransactionCountOutputTypeCountNotesArgs
  }

  // Custom InputTypes
  /**
   * TransactionCountOutputType without action
   */
  export type TransactionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionCountOutputType
     */
    select?: TransactionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TransactionCountOutputType without action
   */
  export type TransactionCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionNoteWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    customers: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customers?: boolean | TagCountOutputTypeCountCustomersArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountCustomersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerTagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Shop
   */

  export type AggregateShop = {
    _count: ShopCountAggregateOutputType | null
    _min: ShopMinAggregateOutputType | null
    _max: ShopMaxAggregateOutputType | null
  }

  export type ShopMinAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    email: string | null
    address: string | null
    city: string | null
    state: string | null
    pincode: string | null
    logoUrl: string | null
    currency: string | null
    upiId: string | null
    isActive: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    email: string | null
    address: string | null
    city: string | null
    state: string | null
    pincode: string | null
    logoUrl: string | null
    currency: string | null
    upiId: string | null
    isActive: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    email: number
    address: number
    city: number
    state: number
    pincode: number
    logoUrl: number
    currency: number
    upiId: number
    isActive: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShopMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    address?: true
    city?: true
    state?: true
    pincode?: true
    logoUrl?: true
    currency?: true
    upiId?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    address?: true
    city?: true
    state?: true
    pincode?: true
    logoUrl?: true
    currency?: true
    upiId?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    address?: true
    city?: true
    state?: true
    pincode?: true
    logoUrl?: true
    currency?: true
    upiId?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShopAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shop to aggregate.
     */
    where?: ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shops to fetch.
     */
    orderBy?: ShopOrderByWithRelationInput | ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shops
    **/
    _count?: true | ShopCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShopMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShopMaxAggregateInputType
  }

  export type GetShopAggregateType<T extends ShopAggregateArgs> = {
        [P in keyof T & keyof AggregateShop]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShop[P]>
      : GetScalarType<T[P], AggregateShop[P]>
  }




  export type ShopGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopWhereInput
    orderBy?: ShopOrderByWithAggregationInput | ShopOrderByWithAggregationInput[]
    by: ShopScalarFieldEnum[] | ShopScalarFieldEnum
    having?: ShopScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShopCountAggregateInputType | true
    _min?: ShopMinAggregateInputType
    _max?: ShopMaxAggregateInputType
  }

  export type ShopGroupByOutputType = {
    id: string
    name: string
    phone: string
    email: string | null
    address: string | null
    city: string | null
    state: string | null
    pincode: string | null
    logoUrl: string | null
    currency: string
    upiId: string | null
    isActive: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ShopCountAggregateOutputType | null
    _min: ShopMinAggregateOutputType | null
    _max: ShopMaxAggregateOutputType | null
  }

  type GetShopGroupByPayload<T extends ShopGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShopGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShopGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShopGroupByOutputType[P]>
            : GetScalarType<T[P], ShopGroupByOutputType[P]>
        }
      >
    >


  export type ShopSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    pincode?: boolean
    logoUrl?: boolean
    currency?: boolean
    upiId?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Shop$usersArgs<ExtArgs>
    customers?: boolean | Shop$customersArgs<ExtArgs>
    transactions?: boolean | Shop$transactionsArgs<ExtArgs>
    subscriptions?: boolean | Shop$subscriptionsArgs<ExtArgs>
    reminders?: boolean | Shop$remindersArgs<ExtArgs>
    notifications?: boolean | Shop$notificationsArgs<ExtArgs>
    _count?: boolean | ShopCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shop"]>

  export type ShopSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    pincode?: boolean
    logoUrl?: boolean
    currency?: boolean
    upiId?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shop"]>

  export type ShopSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    pincode?: boolean
    logoUrl?: boolean
    currency?: boolean
    upiId?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shop"]>

  export type ShopSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    pincode?: boolean
    logoUrl?: boolean
    currency?: boolean
    upiId?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ShopOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "phone" | "email" | "address" | "city" | "state" | "pincode" | "logoUrl" | "currency" | "upiId" | "isActive" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["shop"]>
  export type ShopInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Shop$usersArgs<ExtArgs>
    customers?: boolean | Shop$customersArgs<ExtArgs>
    transactions?: boolean | Shop$transactionsArgs<ExtArgs>
    subscriptions?: boolean | Shop$subscriptionsArgs<ExtArgs>
    reminders?: boolean | Shop$remindersArgs<ExtArgs>
    notifications?: boolean | Shop$notificationsArgs<ExtArgs>
    _count?: boolean | ShopCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ShopIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ShopIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ShopPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Shop"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      customers: Prisma.$CustomerPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
      reminders: Prisma.$ReminderPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      phone: string
      email: string | null
      address: string | null
      city: string | null
      state: string | null
      pincode: string | null
      logoUrl: string | null
      currency: string
      upiId: string | null
      isActive: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shop"]>
    composites: {}
  }

  type ShopGetPayload<S extends boolean | null | undefined | ShopDefaultArgs> = $Result.GetResult<Prisma.$ShopPayload, S>

  type ShopCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShopFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShopCountAggregateInputType | true
    }

  export interface ShopDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Shop'], meta: { name: 'Shop' } }
    /**
     * Find zero or one Shop that matches the filter.
     * @param {ShopFindUniqueArgs} args - Arguments to find a Shop
     * @example
     * // Get one Shop
     * const shop = await prisma.shop.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShopFindUniqueArgs>(args: SelectSubset<T, ShopFindUniqueArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Shop that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShopFindUniqueOrThrowArgs} args - Arguments to find a Shop
     * @example
     * // Get one Shop
     * const shop = await prisma.shop.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShopFindUniqueOrThrowArgs>(args: SelectSubset<T, ShopFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shop that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopFindFirstArgs} args - Arguments to find a Shop
     * @example
     * // Get one Shop
     * const shop = await prisma.shop.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShopFindFirstArgs>(args?: SelectSubset<T, ShopFindFirstArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shop that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopFindFirstOrThrowArgs} args - Arguments to find a Shop
     * @example
     * // Get one Shop
     * const shop = await prisma.shop.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShopFindFirstOrThrowArgs>(args?: SelectSubset<T, ShopFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Shops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shops
     * const shops = await prisma.shop.findMany()
     * 
     * // Get first 10 Shops
     * const shops = await prisma.shop.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shopWithIdOnly = await prisma.shop.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShopFindManyArgs>(args?: SelectSubset<T, ShopFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Shop.
     * @param {ShopCreateArgs} args - Arguments to create a Shop.
     * @example
     * // Create one Shop
     * const Shop = await prisma.shop.create({
     *   data: {
     *     // ... data to create a Shop
     *   }
     * })
     * 
     */
    create<T extends ShopCreateArgs>(args: SelectSubset<T, ShopCreateArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Shops.
     * @param {ShopCreateManyArgs} args - Arguments to create many Shops.
     * @example
     * // Create many Shops
     * const shop = await prisma.shop.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShopCreateManyArgs>(args?: SelectSubset<T, ShopCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Shops and returns the data saved in the database.
     * @param {ShopCreateManyAndReturnArgs} args - Arguments to create many Shops.
     * @example
     * // Create many Shops
     * const shop = await prisma.shop.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Shops and only return the `id`
     * const shopWithIdOnly = await prisma.shop.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShopCreateManyAndReturnArgs>(args?: SelectSubset<T, ShopCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Shop.
     * @param {ShopDeleteArgs} args - Arguments to delete one Shop.
     * @example
     * // Delete one Shop
     * const Shop = await prisma.shop.delete({
     *   where: {
     *     // ... filter to delete one Shop
     *   }
     * })
     * 
     */
    delete<T extends ShopDeleteArgs>(args: SelectSubset<T, ShopDeleteArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Shop.
     * @param {ShopUpdateArgs} args - Arguments to update one Shop.
     * @example
     * // Update one Shop
     * const shop = await prisma.shop.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShopUpdateArgs>(args: SelectSubset<T, ShopUpdateArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Shops.
     * @param {ShopDeleteManyArgs} args - Arguments to filter Shops to delete.
     * @example
     * // Delete a few Shops
     * const { count } = await prisma.shop.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShopDeleteManyArgs>(args?: SelectSubset<T, ShopDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shops
     * const shop = await prisma.shop.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShopUpdateManyArgs>(args: SelectSubset<T, ShopUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shops and returns the data updated in the database.
     * @param {ShopUpdateManyAndReturnArgs} args - Arguments to update many Shops.
     * @example
     * // Update many Shops
     * const shop = await prisma.shop.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Shops and only return the `id`
     * const shopWithIdOnly = await prisma.shop.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ShopUpdateManyAndReturnArgs>(args: SelectSubset<T, ShopUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Shop.
     * @param {ShopUpsertArgs} args - Arguments to update or create a Shop.
     * @example
     * // Update or create a Shop
     * const shop = await prisma.shop.upsert({
     *   create: {
     *     // ... data to create a Shop
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shop we want to update
     *   }
     * })
     */
    upsert<T extends ShopUpsertArgs>(args: SelectSubset<T, ShopUpsertArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Shops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopCountArgs} args - Arguments to filter Shops to count.
     * @example
     * // Count the number of Shops
     * const count = await prisma.shop.count({
     *   where: {
     *     // ... the filter for the Shops we want to count
     *   }
     * })
    **/
    count<T extends ShopCountArgs>(
      args?: Subset<T, ShopCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShopCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShopAggregateArgs>(args: Subset<T, ShopAggregateArgs>): Prisma.PrismaPromise<GetShopAggregateType<T>>

    /**
     * Group by Shop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShopGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShopGroupByArgs['orderBy'] }
        : { orderBy?: ShopGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShopGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Shop model
   */
  readonly fields: ShopFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Shop.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShopClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Shop$usersArgs<ExtArgs> = {}>(args?: Subset<T, Shop$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    customers<T extends Shop$customersArgs<ExtArgs> = {}>(args?: Subset<T, Shop$customersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends Shop$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Shop$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscriptions<T extends Shop$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Shop$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reminders<T extends Shop$remindersArgs<ExtArgs> = {}>(args?: Subset<T, Shop$remindersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends Shop$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Shop$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Shop model
   */
  interface ShopFieldRefs {
    readonly id: FieldRef<"Shop", 'String'>
    readonly name: FieldRef<"Shop", 'String'>
    readonly phone: FieldRef<"Shop", 'String'>
    readonly email: FieldRef<"Shop", 'String'>
    readonly address: FieldRef<"Shop", 'String'>
    readonly city: FieldRef<"Shop", 'String'>
    readonly state: FieldRef<"Shop", 'String'>
    readonly pincode: FieldRef<"Shop", 'String'>
    readonly logoUrl: FieldRef<"Shop", 'String'>
    readonly currency: FieldRef<"Shop", 'String'>
    readonly upiId: FieldRef<"Shop", 'String'>
    readonly isActive: FieldRef<"Shop", 'Boolean'>
    readonly deletedAt: FieldRef<"Shop", 'DateTime'>
    readonly createdAt: FieldRef<"Shop", 'DateTime'>
    readonly updatedAt: FieldRef<"Shop", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Shop findUnique
   */
  export type ShopFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter, which Shop to fetch.
     */
    where: ShopWhereUniqueInput
  }

  /**
   * Shop findUniqueOrThrow
   */
  export type ShopFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter, which Shop to fetch.
     */
    where: ShopWhereUniqueInput
  }

  /**
   * Shop findFirst
   */
  export type ShopFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter, which Shop to fetch.
     */
    where?: ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shops to fetch.
     */
    orderBy?: ShopOrderByWithRelationInput | ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shops.
     */
    cursor?: ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shops.
     */
    distinct?: ShopScalarFieldEnum | ShopScalarFieldEnum[]
  }

  /**
   * Shop findFirstOrThrow
   */
  export type ShopFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter, which Shop to fetch.
     */
    where?: ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shops to fetch.
     */
    orderBy?: ShopOrderByWithRelationInput | ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shops.
     */
    cursor?: ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shops.
     */
    distinct?: ShopScalarFieldEnum | ShopScalarFieldEnum[]
  }

  /**
   * Shop findMany
   */
  export type ShopFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter, which Shops to fetch.
     */
    where?: ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shops to fetch.
     */
    orderBy?: ShopOrderByWithRelationInput | ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shops.
     */
    cursor?: ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shops.
     */
    distinct?: ShopScalarFieldEnum | ShopScalarFieldEnum[]
  }

  /**
   * Shop create
   */
  export type ShopCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * The data needed to create a Shop.
     */
    data: XOR<ShopCreateInput, ShopUncheckedCreateInput>
  }

  /**
   * Shop createMany
   */
  export type ShopCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shops.
     */
    data: ShopCreateManyInput | ShopCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shop createManyAndReturn
   */
  export type ShopCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * The data used to create many Shops.
     */
    data: ShopCreateManyInput | ShopCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shop update
   */
  export type ShopUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * The data needed to update a Shop.
     */
    data: XOR<ShopUpdateInput, ShopUncheckedUpdateInput>
    /**
     * Choose, which Shop to update.
     */
    where: ShopWhereUniqueInput
  }

  /**
   * Shop updateMany
   */
  export type ShopUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Shops.
     */
    data: XOR<ShopUpdateManyMutationInput, ShopUncheckedUpdateManyInput>
    /**
     * Filter which Shops to update
     */
    where?: ShopWhereInput
    /**
     * Limit how many Shops to update.
     */
    limit?: number
  }

  /**
   * Shop updateManyAndReturn
   */
  export type ShopUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * The data used to update Shops.
     */
    data: XOR<ShopUpdateManyMutationInput, ShopUncheckedUpdateManyInput>
    /**
     * Filter which Shops to update
     */
    where?: ShopWhereInput
    /**
     * Limit how many Shops to update.
     */
    limit?: number
  }

  /**
   * Shop upsert
   */
  export type ShopUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * The filter to search for the Shop to update in case it exists.
     */
    where: ShopWhereUniqueInput
    /**
     * In case the Shop found by the `where` argument doesn't exist, create a new Shop with this data.
     */
    create: XOR<ShopCreateInput, ShopUncheckedCreateInput>
    /**
     * In case the Shop was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShopUpdateInput, ShopUncheckedUpdateInput>
  }

  /**
   * Shop delete
   */
  export type ShopDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter which Shop to delete.
     */
    where: ShopWhereUniqueInput
  }

  /**
   * Shop deleteMany
   */
  export type ShopDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shops to delete
     */
    where?: ShopWhereInput
    /**
     * Limit how many Shops to delete.
     */
    limit?: number
  }

  /**
   * Shop.users
   */
  export type Shop$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Shop.customers
   */
  export type Shop$customersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    cursor?: CustomerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Shop.transactions
   */
  export type Shop$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Shop.subscriptions
   */
  export type Shop$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Shop.reminders
   */
  export type Shop$remindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    where?: ReminderWhereInput
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    cursor?: ReminderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Shop.notifications
   */
  export type Shop$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Shop without action
   */
  export type ShopDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    authId: string | null
    name: string | null
    phone: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    isActive: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    inviteCode: string | null
    inviteCodeExpiresAt: Date | null
    inviteCodeUsed: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    authId: string | null
    name: string | null
    phone: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    isActive: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    inviteCode: string | null
    inviteCodeExpiresAt: Date | null
    inviteCodeUsed: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    shopId: number
    authId: number
    name: number
    phone: number
    email: number
    passwordHash: number
    role: number
    isActive: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    inviteCode: number
    inviteCodeExpiresAt: number
    inviteCodeUsed: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    shopId?: true
    authId?: true
    name?: true
    phone?: true
    email?: true
    passwordHash?: true
    role?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    inviteCode?: true
    inviteCodeExpiresAt?: true
    inviteCodeUsed?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    shopId?: true
    authId?: true
    name?: true
    phone?: true
    email?: true
    passwordHash?: true
    role?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    inviteCode?: true
    inviteCodeExpiresAt?: true
    inviteCodeUsed?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    shopId?: true
    authId?: true
    name?: true
    phone?: true
    email?: true
    passwordHash?: true
    role?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    inviteCode?: true
    inviteCodeExpiresAt?: true
    inviteCodeUsed?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    shopId: string | null
    authId: string
    name: string
    phone: string
    email: string | null
    passwordHash: string | null
    role: string
    isActive: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    inviteCode: string | null
    inviteCodeExpiresAt: Date | null
    inviteCodeUsed: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    authId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inviteCode?: boolean
    inviteCodeExpiresAt?: boolean
    inviteCodeUsed?: boolean
    shop?: boolean | User$shopArgs<ExtArgs>
    createdTransactions?: boolean | User$createdTransactionsArgs<ExtArgs>
    createdReminders?: boolean | User$createdRemindersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    authId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inviteCode?: boolean
    inviteCodeExpiresAt?: boolean
    inviteCodeUsed?: boolean
    shop?: boolean | User$shopArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    authId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inviteCode?: boolean
    inviteCodeExpiresAt?: boolean
    inviteCodeUsed?: boolean
    shop?: boolean | User$shopArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    shopId?: boolean
    authId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inviteCode?: boolean
    inviteCodeExpiresAt?: boolean
    inviteCodeUsed?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "authId" | "name" | "phone" | "email" | "passwordHash" | "role" | "isActive" | "deletedAt" | "createdAt" | "updatedAt" | "inviteCode" | "inviteCodeExpiresAt" | "inviteCodeUsed", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | User$shopArgs<ExtArgs>
    createdTransactions?: boolean | User$createdTransactionsArgs<ExtArgs>
    createdReminders?: boolean | User$createdRemindersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | User$shopArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | User$shopArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      shop: Prisma.$ShopPayload<ExtArgs> | null
      createdTransactions: Prisma.$TransactionPayload<ExtArgs>[]
      createdReminders: Prisma.$ReminderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string | null
      authId: string
      name: string
      phone: string
      email: string | null
      passwordHash: string | null
      role: string
      isActive: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
      inviteCode: string | null
      inviteCodeExpiresAt: Date | null
      inviteCodeUsed: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shop<T extends User$shopArgs<ExtArgs> = {}>(args?: Subset<T, User$shopArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    createdTransactions<T extends User$createdTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdReminders<T extends User$createdRemindersArgs<ExtArgs> = {}>(args?: Subset<T, User$createdRemindersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly shopId: FieldRef<"User", 'String'>
    readonly authId: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly inviteCode: FieldRef<"User", 'String'>
    readonly inviteCodeExpiresAt: FieldRef<"User", 'DateTime'>
    readonly inviteCodeUsed: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.shop
   */
  export type User$shopArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    where?: ShopWhereInput
  }

  /**
   * User.createdTransactions
   */
  export type User$createdTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * User.createdReminders
   */
  export type User$createdRemindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    where?: ReminderWhereInput
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    cursor?: ReminderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerAvgAggregateOutputType = {
    balance: Decimal | null
    creditLimit: Decimal | null
  }

  export type CustomerSumAggregateOutputType = {
    balance: Decimal | null
    creditLimit: Decimal | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    name: string | null
    phone: string | null
    email: string | null
    address: string | null
    notes: string | null
    balance: Decimal | null
    creditLimit: Decimal | null
    qrToken: string | null
    qrTokenExpiresAt: Date | null
    reminderInterval: string | null
    lastReminderAt: Date | null
    isActive: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    name: string | null
    phone: string | null
    email: string | null
    address: string | null
    notes: string | null
    balance: Decimal | null
    creditLimit: Decimal | null
    qrToken: string | null
    qrTokenExpiresAt: Date | null
    reminderInterval: string | null
    lastReminderAt: Date | null
    isActive: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    shopId: number
    name: number
    phone: number
    email: number
    address: number
    notes: number
    balance: number
    creditLimit: number
    qrToken: number
    qrTokenExpiresAt: number
    reminderInterval: number
    lastReminderAt: number
    isActive: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerAvgAggregateInputType = {
    balance?: true
    creditLimit?: true
  }

  export type CustomerSumAggregateInputType = {
    balance?: true
    creditLimit?: true
  }

  export type CustomerMinAggregateInputType = {
    id?: true
    shopId?: true
    name?: true
    phone?: true
    email?: true
    address?: true
    notes?: true
    balance?: true
    creditLimit?: true
    qrToken?: true
    qrTokenExpiresAt?: true
    reminderInterval?: true
    lastReminderAt?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    shopId?: true
    name?: true
    phone?: true
    email?: true
    address?: true
    notes?: true
    balance?: true
    creditLimit?: true
    qrToken?: true
    qrTokenExpiresAt?: true
    reminderInterval?: true
    lastReminderAt?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    shopId?: true
    name?: true
    phone?: true
    email?: true
    address?: true
    notes?: true
    balance?: true
    creditLimit?: true
    qrToken?: true
    qrTokenExpiresAt?: true
    reminderInterval?: true
    lastReminderAt?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _avg?: CustomerAvgAggregateInputType
    _sum?: CustomerSumAggregateInputType
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    shopId: string
    name: string
    phone: string
    email: string | null
    address: string | null
    notes: string | null
    balance: Decimal
    creditLimit: Decimal
    qrToken: string | null
    qrTokenExpiresAt: Date | null
    reminderInterval: string
    lastReminderAt: Date | null
    isActive: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    notes?: boolean
    balance?: boolean
    creditLimit?: boolean
    qrToken?: boolean
    qrTokenExpiresAt?: boolean
    reminderInterval?: boolean
    lastReminderAt?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    transactions?: boolean | Customer$transactionsArgs<ExtArgs>
    reminders?: boolean | Customer$remindersArgs<ExtArgs>
    tags?: boolean | Customer$tagsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    notes?: boolean
    balance?: boolean
    creditLimit?: boolean
    qrToken?: boolean
    qrTokenExpiresAt?: boolean
    reminderInterval?: boolean
    lastReminderAt?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    notes?: boolean
    balance?: boolean
    creditLimit?: boolean
    qrToken?: boolean
    qrTokenExpiresAt?: boolean
    reminderInterval?: boolean
    lastReminderAt?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    shopId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    notes?: boolean
    balance?: boolean
    creditLimit?: boolean
    qrToken?: boolean
    qrTokenExpiresAt?: boolean
    reminderInterval?: boolean
    lastReminderAt?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "name" | "phone" | "email" | "address" | "notes" | "balance" | "creditLimit" | "qrToken" | "qrTokenExpiresAt" | "reminderInterval" | "lastReminderAt" | "isActive" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    transactions?: boolean | Customer$transactionsArgs<ExtArgs>
    reminders?: boolean | Customer$remindersArgs<ExtArgs>
    tags?: boolean | Customer$tagsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      shop: Prisma.$ShopPayload<ExtArgs>
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      reminders: Prisma.$ReminderPayload<ExtArgs>[]
      tags: Prisma.$CustomerTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string
      name: string
      phone: string
      email: string | null
      address: string | null
      notes: string | null
      balance: Prisma.Decimal
      creditLimit: Prisma.Decimal
      qrToken: string | null
      qrTokenExpiresAt: Date | null
      reminderInterval: string
      lastReminderAt: Date | null
      isActive: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shop<T extends ShopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopDefaultArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transactions<T extends Customer$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reminders<T extends Customer$remindersArgs<ExtArgs> = {}>(args?: Subset<T, Customer$remindersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tags<T extends Customer$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly shopId: FieldRef<"Customer", 'String'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly address: FieldRef<"Customer", 'String'>
    readonly notes: FieldRef<"Customer", 'String'>
    readonly balance: FieldRef<"Customer", 'Decimal'>
    readonly creditLimit: FieldRef<"Customer", 'Decimal'>
    readonly qrToken: FieldRef<"Customer", 'String'>
    readonly qrTokenExpiresAt: FieldRef<"Customer", 'DateTime'>
    readonly reminderInterval: FieldRef<"Customer", 'String'>
    readonly lastReminderAt: FieldRef<"Customer", 'DateTime'>
    readonly isActive: FieldRef<"Customer", 'Boolean'>
    readonly deletedAt: FieldRef<"Customer", 'DateTime'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.transactions
   */
  export type Customer$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Customer.reminders
   */
  export type Customer$remindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    where?: ReminderWhereInput
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    cursor?: ReminderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Customer.tags
   */
  export type Customer$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTag
     */
    select?: CustomerTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTag
     */
    omit?: CustomerTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTagInclude<ExtArgs> | null
    where?: CustomerTagWhereInput
    orderBy?: CustomerTagOrderByWithRelationInput | CustomerTagOrderByWithRelationInput[]
    cursor?: CustomerTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerTagScalarFieldEnum | CustomerTagScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: Decimal | null
    balanceAfter: Decimal | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: Decimal | null
    balanceAfter: Decimal | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    customerId: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    balanceAfter: Decimal | null
    description: string | null
    referenceNumber: string | null
    paymentMethod: $Enums.PaymentMethod | null
    transactionDate: Date | null
    createdBy: string | null
    deletedAt: Date | null
    createdAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    customerId: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    balanceAfter: Decimal | null
    description: string | null
    referenceNumber: string | null
    paymentMethod: $Enums.PaymentMethod | null
    transactionDate: Date | null
    createdBy: string | null
    deletedAt: Date | null
    createdAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    shopId: number
    customerId: number
    type: number
    amount: number
    balanceAfter: number
    description: number
    referenceNumber: number
    paymentMethod: number
    transactionDate: number
    createdBy: number
    deletedAt: number
    createdAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
    balanceAfter?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
    balanceAfter?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    shopId?: true
    customerId?: true
    type?: true
    amount?: true
    balanceAfter?: true
    description?: true
    referenceNumber?: true
    paymentMethod?: true
    transactionDate?: true
    createdBy?: true
    deletedAt?: true
    createdAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    shopId?: true
    customerId?: true
    type?: true
    amount?: true
    balanceAfter?: true
    description?: true
    referenceNumber?: true
    paymentMethod?: true
    transactionDate?: true
    createdBy?: true
    deletedAt?: true
    createdAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    shopId?: true
    customerId?: true
    type?: true
    amount?: true
    balanceAfter?: true
    description?: true
    referenceNumber?: true
    paymentMethod?: true
    transactionDate?: true
    createdBy?: true
    deletedAt?: true
    createdAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    shopId: string
    customerId: string
    type: $Enums.TransactionType
    amount: Decimal
    balanceAfter: Decimal
    description: string | null
    referenceNumber: string | null
    paymentMethod: $Enums.PaymentMethod | null
    transactionDate: Date
    createdBy: string | null
    deletedAt: Date | null
    createdAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    customerId?: boolean
    type?: boolean
    amount?: boolean
    balanceAfter?: boolean
    description?: boolean
    referenceNumber?: boolean
    paymentMethod?: boolean
    transactionDate?: boolean
    createdBy?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creator?: boolean | Transaction$creatorArgs<ExtArgs>
    notes?: boolean | Transaction$notesArgs<ExtArgs>
    _count?: boolean | TransactionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    customerId?: boolean
    type?: boolean
    amount?: boolean
    balanceAfter?: boolean
    description?: boolean
    referenceNumber?: boolean
    paymentMethod?: boolean
    transactionDate?: boolean
    createdBy?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creator?: boolean | Transaction$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    customerId?: boolean
    type?: boolean
    amount?: boolean
    balanceAfter?: boolean
    description?: boolean
    referenceNumber?: boolean
    paymentMethod?: boolean
    transactionDate?: boolean
    createdBy?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creator?: boolean | Transaction$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    shopId?: boolean
    customerId?: boolean
    type?: boolean
    amount?: boolean
    balanceAfter?: boolean
    description?: boolean
    referenceNumber?: boolean
    paymentMethod?: boolean
    transactionDate?: boolean
    createdBy?: boolean
    deletedAt?: boolean
    createdAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "customerId" | "type" | "amount" | "balanceAfter" | "description" | "referenceNumber" | "paymentMethod" | "transactionDate" | "createdBy" | "deletedAt" | "createdAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creator?: boolean | Transaction$creatorArgs<ExtArgs>
    notes?: boolean | Transaction$notesArgs<ExtArgs>
    _count?: boolean | TransactionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creator?: boolean | Transaction$creatorArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creator?: boolean | Transaction$creatorArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      shop: Prisma.$ShopPayload<ExtArgs>
      customer: Prisma.$CustomerPayload<ExtArgs>
      creator: Prisma.$UserPayload<ExtArgs> | null
      notes: Prisma.$TransactionNotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string
      customerId: string
      type: $Enums.TransactionType
      amount: Prisma.Decimal
      balanceAfter: Prisma.Decimal
      description: string | null
      referenceNumber: string | null
      paymentMethod: $Enums.PaymentMethod | null
      transactionDate: Date
      createdBy: string | null
      deletedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shop<T extends ShopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopDefaultArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    creator<T extends Transaction$creatorArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$creatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    notes<T extends Transaction$notesArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly shopId: FieldRef<"Transaction", 'String'>
    readonly customerId: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'TransactionType'>
    readonly amount: FieldRef<"Transaction", 'Decimal'>
    readonly balanceAfter: FieldRef<"Transaction", 'Decimal'>
    readonly description: FieldRef<"Transaction", 'String'>
    readonly referenceNumber: FieldRef<"Transaction", 'String'>
    readonly paymentMethod: FieldRef<"Transaction", 'PaymentMethod'>
    readonly transactionDate: FieldRef<"Transaction", 'DateTime'>
    readonly createdBy: FieldRef<"Transaction", 'String'>
    readonly deletedAt: FieldRef<"Transaction", 'DateTime'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction.creator
   */
  export type Transaction$creatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Transaction.notes
   */
  export type Transaction$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionNote
     */
    select?: TransactionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionNote
     */
    omit?: TransactionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionNoteInclude<ExtArgs> | null
    where?: TransactionNoteWhereInput
    orderBy?: TransactionNoteOrderByWithRelationInput | TransactionNoteOrderByWithRelationInput[]
    cursor?: TransactionNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionNoteScalarFieldEnum | TransactionNoteScalarFieldEnum[]
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionAvgAggregateOutputType = {
    maxCustomers: number | null
    maxUsers: number | null
    amount: Decimal | null
  }

  export type SubscriptionSumAggregateOutputType = {
    maxCustomers: number | null
    maxUsers: number | null
    amount: Decimal | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    plan: $Enums.SubscriptionPlan | null
    status: $Enums.SubscriptionStatus | null
    maxCustomers: number | null
    maxUsers: number | null
    amount: Decimal | null
    currency: string | null
    billingCycle: string | null
    startsAt: Date | null
    expiresAt: Date | null
    cancelledAt: Date | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    plan: $Enums.SubscriptionPlan | null
    status: $Enums.SubscriptionStatus | null
    maxCustomers: number | null
    maxUsers: number | null
    amount: Decimal | null
    currency: string | null
    billingCycle: string | null
    startsAt: Date | null
    expiresAt: Date | null
    cancelledAt: Date | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    shopId: number
    plan: number
    status: number
    maxCustomers: number
    maxUsers: number
    amount: number
    currency: number
    billingCycle: number
    startsAt: number
    expiresAt: number
    cancelledAt: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionAvgAggregateInputType = {
    maxCustomers?: true
    maxUsers?: true
    amount?: true
  }

  export type SubscriptionSumAggregateInputType = {
    maxCustomers?: true
    maxUsers?: true
    amount?: true
  }

  export type SubscriptionMinAggregateInputType = {
    id?: true
    shopId?: true
    plan?: true
    status?: true
    maxCustomers?: true
    maxUsers?: true
    amount?: true
    currency?: true
    billingCycle?: true
    startsAt?: true
    expiresAt?: true
    cancelledAt?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    shopId?: true
    plan?: true
    status?: true
    maxCustomers?: true
    maxUsers?: true
    amount?: true
    currency?: true
    billingCycle?: true
    startsAt?: true
    expiresAt?: true
    cancelledAt?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    shopId?: true
    plan?: true
    status?: true
    maxCustomers?: true
    maxUsers?: true
    amount?: true
    currency?: true
    billingCycle?: true
    startsAt?: true
    expiresAt?: true
    cancelledAt?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _avg?: SubscriptionAvgAggregateInputType
    _sum?: SubscriptionSumAggregateInputType
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    shopId: string
    plan: $Enums.SubscriptionPlan
    status: $Enums.SubscriptionStatus
    maxCustomers: number
    maxUsers: number
    amount: Decimal
    currency: string
    billingCycle: string
    startsAt: Date
    expiresAt: Date | null
    cancelledAt: Date | null
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    plan?: boolean
    status?: boolean
    maxCustomers?: boolean
    maxUsers?: boolean
    amount?: boolean
    currency?: boolean
    billingCycle?: boolean
    startsAt?: boolean
    expiresAt?: boolean
    cancelledAt?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    plan?: boolean
    status?: boolean
    maxCustomers?: boolean
    maxUsers?: boolean
    amount?: boolean
    currency?: boolean
    billingCycle?: boolean
    startsAt?: boolean
    expiresAt?: boolean
    cancelledAt?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    plan?: boolean
    status?: boolean
    maxCustomers?: boolean
    maxUsers?: boolean
    amount?: boolean
    currency?: boolean
    billingCycle?: boolean
    startsAt?: boolean
    expiresAt?: boolean
    cancelledAt?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectScalar = {
    id?: boolean
    shopId?: boolean
    plan?: boolean
    status?: boolean
    maxCustomers?: boolean
    maxUsers?: boolean
    amount?: boolean
    currency?: boolean
    billingCycle?: boolean
    startsAt?: boolean
    expiresAt?: boolean
    cancelledAt?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "plan" | "status" | "maxCustomers" | "maxUsers" | "amount" | "currency" | "billingCycle" | "startsAt" | "expiresAt" | "cancelledAt" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      shop: Prisma.$ShopPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string
      plan: $Enums.SubscriptionPlan
      status: $Enums.SubscriptionStatus
      maxCustomers: number
      maxUsers: number
      amount: Prisma.Decimal
      currency: string
      billingCycle: string
      startsAt: Date
      expiresAt: Date | null
      cancelledAt: Date | null
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {SubscriptionCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {SubscriptionUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shop<T extends ShopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopDefaultArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'String'>
    readonly shopId: FieldRef<"Subscription", 'String'>
    readonly plan: FieldRef<"Subscription", 'SubscriptionPlan'>
    readonly status: FieldRef<"Subscription", 'SubscriptionStatus'>
    readonly maxCustomers: FieldRef<"Subscription", 'Int'>
    readonly maxUsers: FieldRef<"Subscription", 'Int'>
    readonly amount: FieldRef<"Subscription", 'Decimal'>
    readonly currency: FieldRef<"Subscription", 'String'>
    readonly billingCycle: FieldRef<"Subscription", 'String'>
    readonly startsAt: FieldRef<"Subscription", 'DateTime'>
    readonly expiresAt: FieldRef<"Subscription", 'DateTime'>
    readonly cancelledAt: FieldRef<"Subscription", 'DateTime'>
    readonly deletedAt: FieldRef<"Subscription", 'DateTime'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription createManyAndReturn
   */
  export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
  }

  /**
   * Subscription updateManyAndReturn
   */
  export type SubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model Reminder
   */

  export type AggregateReminder = {
    _count: ReminderCountAggregateOutputType | null
    _avg: ReminderAvgAggregateOutputType | null
    _sum: ReminderSumAggregateOutputType | null
    _min: ReminderMinAggregateOutputType | null
    _max: ReminderMaxAggregateOutputType | null
  }

  export type ReminderAvgAggregateOutputType = {
    amountDue: Decimal | null
  }

  export type ReminderSumAggregateOutputType = {
    amountDue: Decimal | null
  }

  export type ReminderMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    customerId: string | null
    channel: $Enums.ReminderChannel | null
    status: $Enums.ReminderStatus | null
    message: string | null
    amountDue: Decimal | null
    scheduledAt: Date | null
    sentAt: Date | null
    failedReason: string | null
    createdBy: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReminderMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    customerId: string | null
    channel: $Enums.ReminderChannel | null
    status: $Enums.ReminderStatus | null
    message: string | null
    amountDue: Decimal | null
    scheduledAt: Date | null
    sentAt: Date | null
    failedReason: string | null
    createdBy: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReminderCountAggregateOutputType = {
    id: number
    shopId: number
    customerId: number
    channel: number
    status: number
    message: number
    amountDue: number
    scheduledAt: number
    sentAt: number
    failedReason: number
    createdBy: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReminderAvgAggregateInputType = {
    amountDue?: true
  }

  export type ReminderSumAggregateInputType = {
    amountDue?: true
  }

  export type ReminderMinAggregateInputType = {
    id?: true
    shopId?: true
    customerId?: true
    channel?: true
    status?: true
    message?: true
    amountDue?: true
    scheduledAt?: true
    sentAt?: true
    failedReason?: true
    createdBy?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReminderMaxAggregateInputType = {
    id?: true
    shopId?: true
    customerId?: true
    channel?: true
    status?: true
    message?: true
    amountDue?: true
    scheduledAt?: true
    sentAt?: true
    failedReason?: true
    createdBy?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReminderCountAggregateInputType = {
    id?: true
    shopId?: true
    customerId?: true
    channel?: true
    status?: true
    message?: true
    amountDue?: true
    scheduledAt?: true
    sentAt?: true
    failedReason?: true
    createdBy?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReminderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reminder to aggregate.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reminders
    **/
    _count?: true | ReminderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReminderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReminderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReminderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReminderMaxAggregateInputType
  }

  export type GetReminderAggregateType<T extends ReminderAggregateArgs> = {
        [P in keyof T & keyof AggregateReminder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReminder[P]>
      : GetScalarType<T[P], AggregateReminder[P]>
  }




  export type ReminderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReminderWhereInput
    orderBy?: ReminderOrderByWithAggregationInput | ReminderOrderByWithAggregationInput[]
    by: ReminderScalarFieldEnum[] | ReminderScalarFieldEnum
    having?: ReminderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReminderCountAggregateInputType | true
    _avg?: ReminderAvgAggregateInputType
    _sum?: ReminderSumAggregateInputType
    _min?: ReminderMinAggregateInputType
    _max?: ReminderMaxAggregateInputType
  }

  export type ReminderGroupByOutputType = {
    id: string
    shopId: string
    customerId: string
    channel: $Enums.ReminderChannel
    status: $Enums.ReminderStatus
    message: string
    amountDue: Decimal
    scheduledAt: Date
    sentAt: Date | null
    failedReason: string | null
    createdBy: string | null
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ReminderCountAggregateOutputType | null
    _avg: ReminderAvgAggregateOutputType | null
    _sum: ReminderSumAggregateOutputType | null
    _min: ReminderMinAggregateOutputType | null
    _max: ReminderMaxAggregateOutputType | null
  }

  type GetReminderGroupByPayload<T extends ReminderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReminderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReminderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReminderGroupByOutputType[P]>
            : GetScalarType<T[P], ReminderGroupByOutputType[P]>
        }
      >
    >


  export type ReminderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    customerId?: boolean
    channel?: boolean
    status?: boolean
    message?: boolean
    amountDue?: boolean
    scheduledAt?: boolean
    sentAt?: boolean
    failedReason?: boolean
    createdBy?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creator?: boolean | Reminder$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["reminder"]>

  export type ReminderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    customerId?: boolean
    channel?: boolean
    status?: boolean
    message?: boolean
    amountDue?: boolean
    scheduledAt?: boolean
    sentAt?: boolean
    failedReason?: boolean
    createdBy?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creator?: boolean | Reminder$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["reminder"]>

  export type ReminderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    customerId?: boolean
    channel?: boolean
    status?: boolean
    message?: boolean
    amountDue?: boolean
    scheduledAt?: boolean
    sentAt?: boolean
    failedReason?: boolean
    createdBy?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creator?: boolean | Reminder$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["reminder"]>

  export type ReminderSelectScalar = {
    id?: boolean
    shopId?: boolean
    customerId?: boolean
    channel?: boolean
    status?: boolean
    message?: boolean
    amountDue?: boolean
    scheduledAt?: boolean
    sentAt?: boolean
    failedReason?: boolean
    createdBy?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReminderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "customerId" | "channel" | "status" | "message" | "amountDue" | "scheduledAt" | "sentAt" | "failedReason" | "createdBy" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["reminder"]>
  export type ReminderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creator?: boolean | Reminder$creatorArgs<ExtArgs>
  }
  export type ReminderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creator?: boolean | Reminder$creatorArgs<ExtArgs>
  }
  export type ReminderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    creator?: boolean | Reminder$creatorArgs<ExtArgs>
  }

  export type $ReminderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reminder"
    objects: {
      shop: Prisma.$ShopPayload<ExtArgs>
      customer: Prisma.$CustomerPayload<ExtArgs>
      creator: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string
      customerId: string
      channel: $Enums.ReminderChannel
      status: $Enums.ReminderStatus
      message: string
      amountDue: Prisma.Decimal
      scheduledAt: Date
      sentAt: Date | null
      failedReason: string | null
      createdBy: string | null
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["reminder"]>
    composites: {}
  }

  type ReminderGetPayload<S extends boolean | null | undefined | ReminderDefaultArgs> = $Result.GetResult<Prisma.$ReminderPayload, S>

  type ReminderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReminderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReminderCountAggregateInputType | true
    }

  export interface ReminderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reminder'], meta: { name: 'Reminder' } }
    /**
     * Find zero or one Reminder that matches the filter.
     * @param {ReminderFindUniqueArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReminderFindUniqueArgs>(args: SelectSubset<T, ReminderFindUniqueArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reminder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReminderFindUniqueOrThrowArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReminderFindUniqueOrThrowArgs>(args: SelectSubset<T, ReminderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reminder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderFindFirstArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReminderFindFirstArgs>(args?: SelectSubset<T, ReminderFindFirstArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reminder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderFindFirstOrThrowArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReminderFindFirstOrThrowArgs>(args?: SelectSubset<T, ReminderFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reminders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reminders
     * const reminders = await prisma.reminder.findMany()
     * 
     * // Get first 10 Reminders
     * const reminders = await prisma.reminder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reminderWithIdOnly = await prisma.reminder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReminderFindManyArgs>(args?: SelectSubset<T, ReminderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reminder.
     * @param {ReminderCreateArgs} args - Arguments to create a Reminder.
     * @example
     * // Create one Reminder
     * const Reminder = await prisma.reminder.create({
     *   data: {
     *     // ... data to create a Reminder
     *   }
     * })
     * 
     */
    create<T extends ReminderCreateArgs>(args: SelectSubset<T, ReminderCreateArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reminders.
     * @param {ReminderCreateManyArgs} args - Arguments to create many Reminders.
     * @example
     * // Create many Reminders
     * const reminder = await prisma.reminder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReminderCreateManyArgs>(args?: SelectSubset<T, ReminderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reminders and returns the data saved in the database.
     * @param {ReminderCreateManyAndReturnArgs} args - Arguments to create many Reminders.
     * @example
     * // Create many Reminders
     * const reminder = await prisma.reminder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reminders and only return the `id`
     * const reminderWithIdOnly = await prisma.reminder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReminderCreateManyAndReturnArgs>(args?: SelectSubset<T, ReminderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reminder.
     * @param {ReminderDeleteArgs} args - Arguments to delete one Reminder.
     * @example
     * // Delete one Reminder
     * const Reminder = await prisma.reminder.delete({
     *   where: {
     *     // ... filter to delete one Reminder
     *   }
     * })
     * 
     */
    delete<T extends ReminderDeleteArgs>(args: SelectSubset<T, ReminderDeleteArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reminder.
     * @param {ReminderUpdateArgs} args - Arguments to update one Reminder.
     * @example
     * // Update one Reminder
     * const reminder = await prisma.reminder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReminderUpdateArgs>(args: SelectSubset<T, ReminderUpdateArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reminders.
     * @param {ReminderDeleteManyArgs} args - Arguments to filter Reminders to delete.
     * @example
     * // Delete a few Reminders
     * const { count } = await prisma.reminder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReminderDeleteManyArgs>(args?: SelectSubset<T, ReminderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reminders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reminders
     * const reminder = await prisma.reminder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReminderUpdateManyArgs>(args: SelectSubset<T, ReminderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reminders and returns the data updated in the database.
     * @param {ReminderUpdateManyAndReturnArgs} args - Arguments to update many Reminders.
     * @example
     * // Update many Reminders
     * const reminder = await prisma.reminder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reminders and only return the `id`
     * const reminderWithIdOnly = await prisma.reminder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReminderUpdateManyAndReturnArgs>(args: SelectSubset<T, ReminderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reminder.
     * @param {ReminderUpsertArgs} args - Arguments to update or create a Reminder.
     * @example
     * // Update or create a Reminder
     * const reminder = await prisma.reminder.upsert({
     *   create: {
     *     // ... data to create a Reminder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reminder we want to update
     *   }
     * })
     */
    upsert<T extends ReminderUpsertArgs>(args: SelectSubset<T, ReminderUpsertArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reminders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderCountArgs} args - Arguments to filter Reminders to count.
     * @example
     * // Count the number of Reminders
     * const count = await prisma.reminder.count({
     *   where: {
     *     // ... the filter for the Reminders we want to count
     *   }
     * })
    **/
    count<T extends ReminderCountArgs>(
      args?: Subset<T, ReminderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReminderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reminder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReminderAggregateArgs>(args: Subset<T, ReminderAggregateArgs>): Prisma.PrismaPromise<GetReminderAggregateType<T>>

    /**
     * Group by Reminder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReminderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReminderGroupByArgs['orderBy'] }
        : { orderBy?: ReminderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReminderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReminderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reminder model
   */
  readonly fields: ReminderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reminder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReminderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shop<T extends ShopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopDefaultArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    creator<T extends Reminder$creatorArgs<ExtArgs> = {}>(args?: Subset<T, Reminder$creatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reminder model
   */
  interface ReminderFieldRefs {
    readonly id: FieldRef<"Reminder", 'String'>
    readonly shopId: FieldRef<"Reminder", 'String'>
    readonly customerId: FieldRef<"Reminder", 'String'>
    readonly channel: FieldRef<"Reminder", 'ReminderChannel'>
    readonly status: FieldRef<"Reminder", 'ReminderStatus'>
    readonly message: FieldRef<"Reminder", 'String'>
    readonly amountDue: FieldRef<"Reminder", 'Decimal'>
    readonly scheduledAt: FieldRef<"Reminder", 'DateTime'>
    readonly sentAt: FieldRef<"Reminder", 'DateTime'>
    readonly failedReason: FieldRef<"Reminder", 'String'>
    readonly createdBy: FieldRef<"Reminder", 'String'>
    readonly deletedAt: FieldRef<"Reminder", 'DateTime'>
    readonly createdAt: FieldRef<"Reminder", 'DateTime'>
    readonly updatedAt: FieldRef<"Reminder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Reminder findUnique
   */
  export type ReminderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder findUniqueOrThrow
   */
  export type ReminderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder findFirst
   */
  export type ReminderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reminders.
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reminders.
     */
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Reminder findFirstOrThrow
   */
  export type ReminderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reminders.
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reminders.
     */
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Reminder findMany
   */
  export type ReminderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminders to fetch.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reminders.
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reminders.
     */
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Reminder create
   */
  export type ReminderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * The data needed to create a Reminder.
     */
    data: XOR<ReminderCreateInput, ReminderUncheckedCreateInput>
  }

  /**
   * Reminder createMany
   */
  export type ReminderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reminders.
     */
    data: ReminderCreateManyInput | ReminderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reminder createManyAndReturn
   */
  export type ReminderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * The data used to create many Reminders.
     */
    data: ReminderCreateManyInput | ReminderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reminder update
   */
  export type ReminderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * The data needed to update a Reminder.
     */
    data: XOR<ReminderUpdateInput, ReminderUncheckedUpdateInput>
    /**
     * Choose, which Reminder to update.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder updateMany
   */
  export type ReminderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reminders.
     */
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyInput>
    /**
     * Filter which Reminders to update
     */
    where?: ReminderWhereInput
    /**
     * Limit how many Reminders to update.
     */
    limit?: number
  }

  /**
   * Reminder updateManyAndReturn
   */
  export type ReminderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * The data used to update Reminders.
     */
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyInput>
    /**
     * Filter which Reminders to update
     */
    where?: ReminderWhereInput
    /**
     * Limit how many Reminders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reminder upsert
   */
  export type ReminderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * The filter to search for the Reminder to update in case it exists.
     */
    where: ReminderWhereUniqueInput
    /**
     * In case the Reminder found by the `where` argument doesn't exist, create a new Reminder with this data.
     */
    create: XOR<ReminderCreateInput, ReminderUncheckedCreateInput>
    /**
     * In case the Reminder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReminderUpdateInput, ReminderUncheckedUpdateInput>
  }

  /**
   * Reminder delete
   */
  export type ReminderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter which Reminder to delete.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder deleteMany
   */
  export type ReminderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reminders to delete
     */
    where?: ReminderWhereInput
    /**
     * Limit how many Reminders to delete.
     */
    limit?: number
  }

  /**
   * Reminder.creator
   */
  export type Reminder$creatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Reminder without action
   */
  export type ReminderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    userId: string | null
    action: string | null
    details: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    userId: string | null
    action: string | null
    details: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    shopId: number
    userId: number
    action: number
    details: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    shopId?: true
    userId?: true
    action?: true
    details?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    shopId?: true
    userId?: true
    action?: true
    details?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    shopId?: true
    userId?: true
    action?: true
    details?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    shopId: string
    userId: string
    action: string
    details: string
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    shopId?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "userId" | "action" | "details" | "createdAt", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string
      userId: string
      action: string
      details: string
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly shopId: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    name: string | null
    color: string | null
    createdAt: Date | null
  }

  export type TagMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    name: string | null
    color: string | null
    createdAt: Date | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    shopId: number
    name: number
    color: number
    createdAt: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    id?: true
    shopId?: true
    name?: true
    color?: true
    createdAt?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    shopId?: true
    name?: true
    color?: true
    createdAt?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    shopId?: true
    name?: true
    color?: true
    createdAt?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: string
    shopId: string
    name: string
    color: string
    createdAt: Date
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
    customers?: boolean | Tag$customersArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    shopId?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "name" | "color" | "createdAt", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customers?: boolean | Tag$customersArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      customers: Prisma.$CustomerTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string
      name: string
      color: string
      createdAt: Date
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customers<T extends Tag$customersArgs<ExtArgs> = {}>(args?: Subset<T, Tag$customersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'String'>
    readonly shopId: FieldRef<"Tag", 'String'>
    readonly name: FieldRef<"Tag", 'String'>
    readonly color: FieldRef<"Tag", 'String'>
    readonly createdAt: FieldRef<"Tag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag updateManyAndReturn
   */
  export type TagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.customers
   */
  export type Tag$customersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTag
     */
    select?: CustomerTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTag
     */
    omit?: CustomerTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTagInclude<ExtArgs> | null
    where?: CustomerTagWhereInput
    orderBy?: CustomerTagOrderByWithRelationInput | CustomerTagOrderByWithRelationInput[]
    cursor?: CustomerTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerTagScalarFieldEnum | CustomerTagScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model CustomerTag
   */

  export type AggregateCustomerTag = {
    _count: CustomerTagCountAggregateOutputType | null
    _min: CustomerTagMinAggregateOutputType | null
    _max: CustomerTagMaxAggregateOutputType | null
  }

  export type CustomerTagMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    tagId: string | null
    createdAt: Date | null
  }

  export type CustomerTagMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    tagId: string | null
    createdAt: Date | null
  }

  export type CustomerTagCountAggregateOutputType = {
    id: number
    customerId: number
    tagId: number
    createdAt: number
    _all: number
  }


  export type CustomerTagMinAggregateInputType = {
    id?: true
    customerId?: true
    tagId?: true
    createdAt?: true
  }

  export type CustomerTagMaxAggregateInputType = {
    id?: true
    customerId?: true
    tagId?: true
    createdAt?: true
  }

  export type CustomerTagCountAggregateInputType = {
    id?: true
    customerId?: true
    tagId?: true
    createdAt?: true
    _all?: true
  }

  export type CustomerTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerTag to aggregate.
     */
    where?: CustomerTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerTags to fetch.
     */
    orderBy?: CustomerTagOrderByWithRelationInput | CustomerTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerTags
    **/
    _count?: true | CustomerTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerTagMaxAggregateInputType
  }

  export type GetCustomerTagAggregateType<T extends CustomerTagAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerTag[P]>
      : GetScalarType<T[P], AggregateCustomerTag[P]>
  }




  export type CustomerTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerTagWhereInput
    orderBy?: CustomerTagOrderByWithAggregationInput | CustomerTagOrderByWithAggregationInput[]
    by: CustomerTagScalarFieldEnum[] | CustomerTagScalarFieldEnum
    having?: CustomerTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerTagCountAggregateInputType | true
    _min?: CustomerTagMinAggregateInputType
    _max?: CustomerTagMaxAggregateInputType
  }

  export type CustomerTagGroupByOutputType = {
    id: string
    customerId: string
    tagId: string
    createdAt: Date
    _count: CustomerTagCountAggregateOutputType | null
    _min: CustomerTagMinAggregateOutputType | null
    _max: CustomerTagMaxAggregateOutputType | null
  }

  type GetCustomerTagGroupByPayload<T extends CustomerTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerTagGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerTagGroupByOutputType[P]>
        }
      >
    >


  export type CustomerTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    tagId?: boolean
    createdAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerTag"]>

  export type CustomerTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    tagId?: boolean
    createdAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerTag"]>

  export type CustomerTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    tagId?: boolean
    createdAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerTag"]>

  export type CustomerTagSelectScalar = {
    id?: boolean
    customerId?: boolean
    tagId?: boolean
    createdAt?: boolean
  }

  export type CustomerTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "tagId" | "createdAt", ExtArgs["result"]["customerTag"]>
  export type CustomerTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type CustomerTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type CustomerTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $CustomerTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerTag"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      tagId: string
      createdAt: Date
    }, ExtArgs["result"]["customerTag"]>
    composites: {}
  }

  type CustomerTagGetPayload<S extends boolean | null | undefined | CustomerTagDefaultArgs> = $Result.GetResult<Prisma.$CustomerTagPayload, S>

  type CustomerTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerTagCountAggregateInputType | true
    }

  export interface CustomerTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerTag'], meta: { name: 'CustomerTag' } }
    /**
     * Find zero or one CustomerTag that matches the filter.
     * @param {CustomerTagFindUniqueArgs} args - Arguments to find a CustomerTag
     * @example
     * // Get one CustomerTag
     * const customerTag = await prisma.customerTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerTagFindUniqueArgs>(args: SelectSubset<T, CustomerTagFindUniqueArgs<ExtArgs>>): Prisma__CustomerTagClient<$Result.GetResult<Prisma.$CustomerTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomerTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerTagFindUniqueOrThrowArgs} args - Arguments to find a CustomerTag
     * @example
     * // Get one CustomerTag
     * const customerTag = await prisma.customerTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerTagFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerTagClient<$Result.GetResult<Prisma.$CustomerTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerTagFindFirstArgs} args - Arguments to find a CustomerTag
     * @example
     * // Get one CustomerTag
     * const customerTag = await prisma.customerTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerTagFindFirstArgs>(args?: SelectSubset<T, CustomerTagFindFirstArgs<ExtArgs>>): Prisma__CustomerTagClient<$Result.GetResult<Prisma.$CustomerTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerTagFindFirstOrThrowArgs} args - Arguments to find a CustomerTag
     * @example
     * // Get one CustomerTag
     * const customerTag = await prisma.customerTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerTagFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerTagClient<$Result.GetResult<Prisma.$CustomerTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomerTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerTags
     * const customerTags = await prisma.customerTag.findMany()
     * 
     * // Get first 10 CustomerTags
     * const customerTags = await prisma.customerTag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerTagWithIdOnly = await prisma.customerTag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerTagFindManyArgs>(args?: SelectSubset<T, CustomerTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomerTag.
     * @param {CustomerTagCreateArgs} args - Arguments to create a CustomerTag.
     * @example
     * // Create one CustomerTag
     * const CustomerTag = await prisma.customerTag.create({
     *   data: {
     *     // ... data to create a CustomerTag
     *   }
     * })
     * 
     */
    create<T extends CustomerTagCreateArgs>(args: SelectSubset<T, CustomerTagCreateArgs<ExtArgs>>): Prisma__CustomerTagClient<$Result.GetResult<Prisma.$CustomerTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomerTags.
     * @param {CustomerTagCreateManyArgs} args - Arguments to create many CustomerTags.
     * @example
     * // Create many CustomerTags
     * const customerTag = await prisma.customerTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerTagCreateManyArgs>(args?: SelectSubset<T, CustomerTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomerTags and returns the data saved in the database.
     * @param {CustomerTagCreateManyAndReturnArgs} args - Arguments to create many CustomerTags.
     * @example
     * // Create many CustomerTags
     * const customerTag = await prisma.customerTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomerTags and only return the `id`
     * const customerTagWithIdOnly = await prisma.customerTag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerTagCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CustomerTag.
     * @param {CustomerTagDeleteArgs} args - Arguments to delete one CustomerTag.
     * @example
     * // Delete one CustomerTag
     * const CustomerTag = await prisma.customerTag.delete({
     *   where: {
     *     // ... filter to delete one CustomerTag
     *   }
     * })
     * 
     */
    delete<T extends CustomerTagDeleteArgs>(args: SelectSubset<T, CustomerTagDeleteArgs<ExtArgs>>): Prisma__CustomerTagClient<$Result.GetResult<Prisma.$CustomerTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomerTag.
     * @param {CustomerTagUpdateArgs} args - Arguments to update one CustomerTag.
     * @example
     * // Update one CustomerTag
     * const customerTag = await prisma.customerTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerTagUpdateArgs>(args: SelectSubset<T, CustomerTagUpdateArgs<ExtArgs>>): Prisma__CustomerTagClient<$Result.GetResult<Prisma.$CustomerTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomerTags.
     * @param {CustomerTagDeleteManyArgs} args - Arguments to filter CustomerTags to delete.
     * @example
     * // Delete a few CustomerTags
     * const { count } = await prisma.customerTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerTagDeleteManyArgs>(args?: SelectSubset<T, CustomerTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerTags
     * const customerTag = await prisma.customerTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerTagUpdateManyArgs>(args: SelectSubset<T, CustomerTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerTags and returns the data updated in the database.
     * @param {CustomerTagUpdateManyAndReturnArgs} args - Arguments to update many CustomerTags.
     * @example
     * // Update many CustomerTags
     * const customerTag = await prisma.customerTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CustomerTags and only return the `id`
     * const customerTagWithIdOnly = await prisma.customerTag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerTagUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CustomerTag.
     * @param {CustomerTagUpsertArgs} args - Arguments to update or create a CustomerTag.
     * @example
     * // Update or create a CustomerTag
     * const customerTag = await prisma.customerTag.upsert({
     *   create: {
     *     // ... data to create a CustomerTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerTag we want to update
     *   }
     * })
     */
    upsert<T extends CustomerTagUpsertArgs>(args: SelectSubset<T, CustomerTagUpsertArgs<ExtArgs>>): Prisma__CustomerTagClient<$Result.GetResult<Prisma.$CustomerTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CustomerTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerTagCountArgs} args - Arguments to filter CustomerTags to count.
     * @example
     * // Count the number of CustomerTags
     * const count = await prisma.customerTag.count({
     *   where: {
     *     // ... the filter for the CustomerTags we want to count
     *   }
     * })
    **/
    count<T extends CustomerTagCountArgs>(
      args?: Subset<T, CustomerTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerTagAggregateArgs>(args: Subset<T, CustomerTagAggregateArgs>): Prisma.PrismaPromise<GetCustomerTagAggregateType<T>>

    /**
     * Group by CustomerTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerTagGroupByArgs['orderBy'] }
        : { orderBy?: CustomerTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerTag model
   */
  readonly fields: CustomerTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CustomerTag model
   */
  interface CustomerTagFieldRefs {
    readonly id: FieldRef<"CustomerTag", 'String'>
    readonly customerId: FieldRef<"CustomerTag", 'String'>
    readonly tagId: FieldRef<"CustomerTag", 'String'>
    readonly createdAt: FieldRef<"CustomerTag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomerTag findUnique
   */
  export type CustomerTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTag
     */
    select?: CustomerTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTag
     */
    omit?: CustomerTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTagInclude<ExtArgs> | null
    /**
     * Filter, which CustomerTag to fetch.
     */
    where: CustomerTagWhereUniqueInput
  }

  /**
   * CustomerTag findUniqueOrThrow
   */
  export type CustomerTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTag
     */
    select?: CustomerTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTag
     */
    omit?: CustomerTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTagInclude<ExtArgs> | null
    /**
     * Filter, which CustomerTag to fetch.
     */
    where: CustomerTagWhereUniqueInput
  }

  /**
   * CustomerTag findFirst
   */
  export type CustomerTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTag
     */
    select?: CustomerTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTag
     */
    omit?: CustomerTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTagInclude<ExtArgs> | null
    /**
     * Filter, which CustomerTag to fetch.
     */
    where?: CustomerTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerTags to fetch.
     */
    orderBy?: CustomerTagOrderByWithRelationInput | CustomerTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerTags.
     */
    cursor?: CustomerTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerTags.
     */
    distinct?: CustomerTagScalarFieldEnum | CustomerTagScalarFieldEnum[]
  }

  /**
   * CustomerTag findFirstOrThrow
   */
  export type CustomerTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTag
     */
    select?: CustomerTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTag
     */
    omit?: CustomerTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTagInclude<ExtArgs> | null
    /**
     * Filter, which CustomerTag to fetch.
     */
    where?: CustomerTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerTags to fetch.
     */
    orderBy?: CustomerTagOrderByWithRelationInput | CustomerTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerTags.
     */
    cursor?: CustomerTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerTags.
     */
    distinct?: CustomerTagScalarFieldEnum | CustomerTagScalarFieldEnum[]
  }

  /**
   * CustomerTag findMany
   */
  export type CustomerTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTag
     */
    select?: CustomerTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTag
     */
    omit?: CustomerTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTagInclude<ExtArgs> | null
    /**
     * Filter, which CustomerTags to fetch.
     */
    where?: CustomerTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerTags to fetch.
     */
    orderBy?: CustomerTagOrderByWithRelationInput | CustomerTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerTags.
     */
    cursor?: CustomerTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerTags.
     */
    distinct?: CustomerTagScalarFieldEnum | CustomerTagScalarFieldEnum[]
  }

  /**
   * CustomerTag create
   */
  export type CustomerTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTag
     */
    select?: CustomerTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTag
     */
    omit?: CustomerTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTagInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomerTag.
     */
    data: XOR<CustomerTagCreateInput, CustomerTagUncheckedCreateInput>
  }

  /**
   * CustomerTag createMany
   */
  export type CustomerTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerTags.
     */
    data: CustomerTagCreateManyInput | CustomerTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerTag createManyAndReturn
   */
  export type CustomerTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTag
     */
    select?: CustomerTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTag
     */
    omit?: CustomerTagOmit<ExtArgs> | null
    /**
     * The data used to create many CustomerTags.
     */
    data: CustomerTagCreateManyInput | CustomerTagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomerTag update
   */
  export type CustomerTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTag
     */
    select?: CustomerTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTag
     */
    omit?: CustomerTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTagInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomerTag.
     */
    data: XOR<CustomerTagUpdateInput, CustomerTagUncheckedUpdateInput>
    /**
     * Choose, which CustomerTag to update.
     */
    where: CustomerTagWhereUniqueInput
  }

  /**
   * CustomerTag updateMany
   */
  export type CustomerTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerTags.
     */
    data: XOR<CustomerTagUpdateManyMutationInput, CustomerTagUncheckedUpdateManyInput>
    /**
     * Filter which CustomerTags to update
     */
    where?: CustomerTagWhereInput
    /**
     * Limit how many CustomerTags to update.
     */
    limit?: number
  }

  /**
   * CustomerTag updateManyAndReturn
   */
  export type CustomerTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTag
     */
    select?: CustomerTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTag
     */
    omit?: CustomerTagOmit<ExtArgs> | null
    /**
     * The data used to update CustomerTags.
     */
    data: XOR<CustomerTagUpdateManyMutationInput, CustomerTagUncheckedUpdateManyInput>
    /**
     * Filter which CustomerTags to update
     */
    where?: CustomerTagWhereInput
    /**
     * Limit how many CustomerTags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomerTag upsert
   */
  export type CustomerTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTag
     */
    select?: CustomerTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTag
     */
    omit?: CustomerTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTagInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomerTag to update in case it exists.
     */
    where: CustomerTagWhereUniqueInput
    /**
     * In case the CustomerTag found by the `where` argument doesn't exist, create a new CustomerTag with this data.
     */
    create: XOR<CustomerTagCreateInput, CustomerTagUncheckedCreateInput>
    /**
     * In case the CustomerTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerTagUpdateInput, CustomerTagUncheckedUpdateInput>
  }

  /**
   * CustomerTag delete
   */
  export type CustomerTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTag
     */
    select?: CustomerTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTag
     */
    omit?: CustomerTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTagInclude<ExtArgs> | null
    /**
     * Filter which CustomerTag to delete.
     */
    where: CustomerTagWhereUniqueInput
  }

  /**
   * CustomerTag deleteMany
   */
  export type CustomerTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerTags to delete
     */
    where?: CustomerTagWhereInput
    /**
     * Limit how many CustomerTags to delete.
     */
    limit?: number
  }

  /**
   * CustomerTag without action
   */
  export type CustomerTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerTag
     */
    select?: CustomerTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerTag
     */
    omit?: CustomerTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerTagInclude<ExtArgs> | null
  }


  /**
   * Model TransactionNote
   */

  export type AggregateTransactionNote = {
    _count: TransactionNoteCountAggregateOutputType | null
    _min: TransactionNoteMinAggregateOutputType | null
    _max: TransactionNoteMaxAggregateOutputType | null
  }

  export type TransactionNoteMinAggregateOutputType = {
    id: string | null
    transactionId: string | null
    shopId: string | null
    userId: string | null
    content: string | null
    isDispute: boolean | null
    createdAt: Date | null
  }

  export type TransactionNoteMaxAggregateOutputType = {
    id: string | null
    transactionId: string | null
    shopId: string | null
    userId: string | null
    content: string | null
    isDispute: boolean | null
    createdAt: Date | null
  }

  export type TransactionNoteCountAggregateOutputType = {
    id: number
    transactionId: number
    shopId: number
    userId: number
    content: number
    isDispute: number
    createdAt: number
    _all: number
  }


  export type TransactionNoteMinAggregateInputType = {
    id?: true
    transactionId?: true
    shopId?: true
    userId?: true
    content?: true
    isDispute?: true
    createdAt?: true
  }

  export type TransactionNoteMaxAggregateInputType = {
    id?: true
    transactionId?: true
    shopId?: true
    userId?: true
    content?: true
    isDispute?: true
    createdAt?: true
  }

  export type TransactionNoteCountAggregateInputType = {
    id?: true
    transactionId?: true
    shopId?: true
    userId?: true
    content?: true
    isDispute?: true
    createdAt?: true
    _all?: true
  }

  export type TransactionNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TransactionNote to aggregate.
     */
    where?: TransactionNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionNotes to fetch.
     */
    orderBy?: TransactionNoteOrderByWithRelationInput | TransactionNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TransactionNotes
    **/
    _count?: true | TransactionNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionNoteMaxAggregateInputType
  }

  export type GetTransactionNoteAggregateType<T extends TransactionNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateTransactionNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransactionNote[P]>
      : GetScalarType<T[P], AggregateTransactionNote[P]>
  }




  export type TransactionNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionNoteWhereInput
    orderBy?: TransactionNoteOrderByWithAggregationInput | TransactionNoteOrderByWithAggregationInput[]
    by: TransactionNoteScalarFieldEnum[] | TransactionNoteScalarFieldEnum
    having?: TransactionNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionNoteCountAggregateInputType | true
    _min?: TransactionNoteMinAggregateInputType
    _max?: TransactionNoteMaxAggregateInputType
  }

  export type TransactionNoteGroupByOutputType = {
    id: string
    transactionId: string
    shopId: string
    userId: string | null
    content: string
    isDispute: boolean
    createdAt: Date
    _count: TransactionNoteCountAggregateOutputType | null
    _min: TransactionNoteMinAggregateOutputType | null
    _max: TransactionNoteMaxAggregateOutputType | null
  }

  type GetTransactionNoteGroupByPayload<T extends TransactionNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionNoteGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionNoteGroupByOutputType[P]>
        }
      >
    >


  export type TransactionNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionId?: boolean
    shopId?: boolean
    userId?: boolean
    content?: boolean
    isDispute?: boolean
    createdAt?: boolean
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transactionNote"]>

  export type TransactionNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionId?: boolean
    shopId?: boolean
    userId?: boolean
    content?: boolean
    isDispute?: boolean
    createdAt?: boolean
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transactionNote"]>

  export type TransactionNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionId?: boolean
    shopId?: boolean
    userId?: boolean
    content?: boolean
    isDispute?: boolean
    createdAt?: boolean
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transactionNote"]>

  export type TransactionNoteSelectScalar = {
    id?: boolean
    transactionId?: boolean
    shopId?: boolean
    userId?: boolean
    content?: boolean
    isDispute?: boolean
    createdAt?: boolean
  }

  export type TransactionNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "transactionId" | "shopId" | "userId" | "content" | "isDispute" | "createdAt", ExtArgs["result"]["transactionNote"]>
  export type TransactionNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
  }
  export type TransactionNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
  }
  export type TransactionNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
  }

  export type $TransactionNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TransactionNote"
    objects: {
      transaction: Prisma.$TransactionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      transactionId: string
      shopId: string
      userId: string | null
      content: string
      isDispute: boolean
      createdAt: Date
    }, ExtArgs["result"]["transactionNote"]>
    composites: {}
  }

  type TransactionNoteGetPayload<S extends boolean | null | undefined | TransactionNoteDefaultArgs> = $Result.GetResult<Prisma.$TransactionNotePayload, S>

  type TransactionNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionNoteCountAggregateInputType | true
    }

  export interface TransactionNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TransactionNote'], meta: { name: 'TransactionNote' } }
    /**
     * Find zero or one TransactionNote that matches the filter.
     * @param {TransactionNoteFindUniqueArgs} args - Arguments to find a TransactionNote
     * @example
     * // Get one TransactionNote
     * const transactionNote = await prisma.transactionNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionNoteFindUniqueArgs>(args: SelectSubset<T, TransactionNoteFindUniqueArgs<ExtArgs>>): Prisma__TransactionNoteClient<$Result.GetResult<Prisma.$TransactionNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TransactionNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionNoteFindUniqueOrThrowArgs} args - Arguments to find a TransactionNote
     * @example
     * // Get one TransactionNote
     * const transactionNote = await prisma.transactionNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionNoteClient<$Result.GetResult<Prisma.$TransactionNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TransactionNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionNoteFindFirstArgs} args - Arguments to find a TransactionNote
     * @example
     * // Get one TransactionNote
     * const transactionNote = await prisma.transactionNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionNoteFindFirstArgs>(args?: SelectSubset<T, TransactionNoteFindFirstArgs<ExtArgs>>): Prisma__TransactionNoteClient<$Result.GetResult<Prisma.$TransactionNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TransactionNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionNoteFindFirstOrThrowArgs} args - Arguments to find a TransactionNote
     * @example
     * // Get one TransactionNote
     * const transactionNote = await prisma.transactionNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionNoteClient<$Result.GetResult<Prisma.$TransactionNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TransactionNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TransactionNotes
     * const transactionNotes = await prisma.transactionNote.findMany()
     * 
     * // Get first 10 TransactionNotes
     * const transactionNotes = await prisma.transactionNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionNoteWithIdOnly = await prisma.transactionNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionNoteFindManyArgs>(args?: SelectSubset<T, TransactionNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TransactionNote.
     * @param {TransactionNoteCreateArgs} args - Arguments to create a TransactionNote.
     * @example
     * // Create one TransactionNote
     * const TransactionNote = await prisma.transactionNote.create({
     *   data: {
     *     // ... data to create a TransactionNote
     *   }
     * })
     * 
     */
    create<T extends TransactionNoteCreateArgs>(args: SelectSubset<T, TransactionNoteCreateArgs<ExtArgs>>): Prisma__TransactionNoteClient<$Result.GetResult<Prisma.$TransactionNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TransactionNotes.
     * @param {TransactionNoteCreateManyArgs} args - Arguments to create many TransactionNotes.
     * @example
     * // Create many TransactionNotes
     * const transactionNote = await prisma.transactionNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionNoteCreateManyArgs>(args?: SelectSubset<T, TransactionNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TransactionNotes and returns the data saved in the database.
     * @param {TransactionNoteCreateManyAndReturnArgs} args - Arguments to create many TransactionNotes.
     * @example
     * // Create many TransactionNotes
     * const transactionNote = await prisma.transactionNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TransactionNotes and only return the `id`
     * const transactionNoteWithIdOnly = await prisma.transactionNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TransactionNote.
     * @param {TransactionNoteDeleteArgs} args - Arguments to delete one TransactionNote.
     * @example
     * // Delete one TransactionNote
     * const TransactionNote = await prisma.transactionNote.delete({
     *   where: {
     *     // ... filter to delete one TransactionNote
     *   }
     * })
     * 
     */
    delete<T extends TransactionNoteDeleteArgs>(args: SelectSubset<T, TransactionNoteDeleteArgs<ExtArgs>>): Prisma__TransactionNoteClient<$Result.GetResult<Prisma.$TransactionNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TransactionNote.
     * @param {TransactionNoteUpdateArgs} args - Arguments to update one TransactionNote.
     * @example
     * // Update one TransactionNote
     * const transactionNote = await prisma.transactionNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionNoteUpdateArgs>(args: SelectSubset<T, TransactionNoteUpdateArgs<ExtArgs>>): Prisma__TransactionNoteClient<$Result.GetResult<Prisma.$TransactionNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TransactionNotes.
     * @param {TransactionNoteDeleteManyArgs} args - Arguments to filter TransactionNotes to delete.
     * @example
     * // Delete a few TransactionNotes
     * const { count } = await prisma.transactionNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionNoteDeleteManyArgs>(args?: SelectSubset<T, TransactionNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TransactionNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TransactionNotes
     * const transactionNote = await prisma.transactionNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionNoteUpdateManyArgs>(args: SelectSubset<T, TransactionNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TransactionNotes and returns the data updated in the database.
     * @param {TransactionNoteUpdateManyAndReturnArgs} args - Arguments to update many TransactionNotes.
     * @example
     * // Update many TransactionNotes
     * const transactionNote = await prisma.transactionNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TransactionNotes and only return the `id`
     * const transactionNoteWithIdOnly = await prisma.transactionNote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TransactionNote.
     * @param {TransactionNoteUpsertArgs} args - Arguments to update or create a TransactionNote.
     * @example
     * // Update or create a TransactionNote
     * const transactionNote = await prisma.transactionNote.upsert({
     *   create: {
     *     // ... data to create a TransactionNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TransactionNote we want to update
     *   }
     * })
     */
    upsert<T extends TransactionNoteUpsertArgs>(args: SelectSubset<T, TransactionNoteUpsertArgs<ExtArgs>>): Prisma__TransactionNoteClient<$Result.GetResult<Prisma.$TransactionNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TransactionNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionNoteCountArgs} args - Arguments to filter TransactionNotes to count.
     * @example
     * // Count the number of TransactionNotes
     * const count = await prisma.transactionNote.count({
     *   where: {
     *     // ... the filter for the TransactionNotes we want to count
     *   }
     * })
    **/
    count<T extends TransactionNoteCountArgs>(
      args?: Subset<T, TransactionNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TransactionNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionNoteAggregateArgs>(args: Subset<T, TransactionNoteAggregateArgs>): Prisma.PrismaPromise<GetTransactionNoteAggregateType<T>>

    /**
     * Group by TransactionNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionNoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionNoteGroupByArgs['orderBy'] }
        : { orderBy?: TransactionNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TransactionNote model
   */
  readonly fields: TransactionNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TransactionNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transaction<T extends TransactionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TransactionDefaultArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TransactionNote model
   */
  interface TransactionNoteFieldRefs {
    readonly id: FieldRef<"TransactionNote", 'String'>
    readonly transactionId: FieldRef<"TransactionNote", 'String'>
    readonly shopId: FieldRef<"TransactionNote", 'String'>
    readonly userId: FieldRef<"TransactionNote", 'String'>
    readonly content: FieldRef<"TransactionNote", 'String'>
    readonly isDispute: FieldRef<"TransactionNote", 'Boolean'>
    readonly createdAt: FieldRef<"TransactionNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TransactionNote findUnique
   */
  export type TransactionNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionNote
     */
    select?: TransactionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionNote
     */
    omit?: TransactionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionNoteInclude<ExtArgs> | null
    /**
     * Filter, which TransactionNote to fetch.
     */
    where: TransactionNoteWhereUniqueInput
  }

  /**
   * TransactionNote findUniqueOrThrow
   */
  export type TransactionNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionNote
     */
    select?: TransactionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionNote
     */
    omit?: TransactionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionNoteInclude<ExtArgs> | null
    /**
     * Filter, which TransactionNote to fetch.
     */
    where: TransactionNoteWhereUniqueInput
  }

  /**
   * TransactionNote findFirst
   */
  export type TransactionNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionNote
     */
    select?: TransactionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionNote
     */
    omit?: TransactionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionNoteInclude<ExtArgs> | null
    /**
     * Filter, which TransactionNote to fetch.
     */
    where?: TransactionNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionNotes to fetch.
     */
    orderBy?: TransactionNoteOrderByWithRelationInput | TransactionNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransactionNotes.
     */
    cursor?: TransactionNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransactionNotes.
     */
    distinct?: TransactionNoteScalarFieldEnum | TransactionNoteScalarFieldEnum[]
  }

  /**
   * TransactionNote findFirstOrThrow
   */
  export type TransactionNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionNote
     */
    select?: TransactionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionNote
     */
    omit?: TransactionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionNoteInclude<ExtArgs> | null
    /**
     * Filter, which TransactionNote to fetch.
     */
    where?: TransactionNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionNotes to fetch.
     */
    orderBy?: TransactionNoteOrderByWithRelationInput | TransactionNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransactionNotes.
     */
    cursor?: TransactionNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransactionNotes.
     */
    distinct?: TransactionNoteScalarFieldEnum | TransactionNoteScalarFieldEnum[]
  }

  /**
   * TransactionNote findMany
   */
  export type TransactionNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionNote
     */
    select?: TransactionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionNote
     */
    omit?: TransactionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionNoteInclude<ExtArgs> | null
    /**
     * Filter, which TransactionNotes to fetch.
     */
    where?: TransactionNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransactionNotes to fetch.
     */
    orderBy?: TransactionNoteOrderByWithRelationInput | TransactionNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TransactionNotes.
     */
    cursor?: TransactionNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransactionNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransactionNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransactionNotes.
     */
    distinct?: TransactionNoteScalarFieldEnum | TransactionNoteScalarFieldEnum[]
  }

  /**
   * TransactionNote create
   */
  export type TransactionNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionNote
     */
    select?: TransactionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionNote
     */
    omit?: TransactionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a TransactionNote.
     */
    data: XOR<TransactionNoteCreateInput, TransactionNoteUncheckedCreateInput>
  }

  /**
   * TransactionNote createMany
   */
  export type TransactionNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TransactionNotes.
     */
    data: TransactionNoteCreateManyInput | TransactionNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TransactionNote createManyAndReturn
   */
  export type TransactionNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionNote
     */
    select?: TransactionNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionNote
     */
    omit?: TransactionNoteOmit<ExtArgs> | null
    /**
     * The data used to create many TransactionNotes.
     */
    data: TransactionNoteCreateManyInput | TransactionNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TransactionNote update
   */
  export type TransactionNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionNote
     */
    select?: TransactionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionNote
     */
    omit?: TransactionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a TransactionNote.
     */
    data: XOR<TransactionNoteUpdateInput, TransactionNoteUncheckedUpdateInput>
    /**
     * Choose, which TransactionNote to update.
     */
    where: TransactionNoteWhereUniqueInput
  }

  /**
   * TransactionNote updateMany
   */
  export type TransactionNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TransactionNotes.
     */
    data: XOR<TransactionNoteUpdateManyMutationInput, TransactionNoteUncheckedUpdateManyInput>
    /**
     * Filter which TransactionNotes to update
     */
    where?: TransactionNoteWhereInput
    /**
     * Limit how many TransactionNotes to update.
     */
    limit?: number
  }

  /**
   * TransactionNote updateManyAndReturn
   */
  export type TransactionNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionNote
     */
    select?: TransactionNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionNote
     */
    omit?: TransactionNoteOmit<ExtArgs> | null
    /**
     * The data used to update TransactionNotes.
     */
    data: XOR<TransactionNoteUpdateManyMutationInput, TransactionNoteUncheckedUpdateManyInput>
    /**
     * Filter which TransactionNotes to update
     */
    where?: TransactionNoteWhereInput
    /**
     * Limit how many TransactionNotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionNoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TransactionNote upsert
   */
  export type TransactionNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionNote
     */
    select?: TransactionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionNote
     */
    omit?: TransactionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the TransactionNote to update in case it exists.
     */
    where: TransactionNoteWhereUniqueInput
    /**
     * In case the TransactionNote found by the `where` argument doesn't exist, create a new TransactionNote with this data.
     */
    create: XOR<TransactionNoteCreateInput, TransactionNoteUncheckedCreateInput>
    /**
     * In case the TransactionNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionNoteUpdateInput, TransactionNoteUncheckedUpdateInput>
  }

  /**
   * TransactionNote delete
   */
  export type TransactionNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionNote
     */
    select?: TransactionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionNote
     */
    omit?: TransactionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionNoteInclude<ExtArgs> | null
    /**
     * Filter which TransactionNote to delete.
     */
    where: TransactionNoteWhereUniqueInput
  }

  /**
   * TransactionNote deleteMany
   */
  export type TransactionNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TransactionNotes to delete
     */
    where?: TransactionNoteWhereInput
    /**
     * Limit how many TransactionNotes to delete.
     */
    limit?: number
  }

  /**
   * TransactionNote without action
   */
  export type TransactionNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionNote
     */
    select?: TransactionNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransactionNote
     */
    omit?: TransactionNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionNoteInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    shopId: number
    userId: number
    title: number
    message: number
    type: number
    isRead: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    shopId?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    shopId?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    shopId?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    shopId: string
    userId: string
    title: string
    message: string
    type: string
    isRead: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    createdAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    createdAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    createdAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    shopId?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "userId" | "title" | "message" | "type" | "isRead" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      shop: Prisma.$ShopPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string
      userId: string
      title: string
      message: string
      type: string
      isRead: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shop<T extends ShopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopDefaultArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly shopId: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ShopScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    email: 'email',
    address: 'address',
    city: 'city',
    state: 'state',
    pincode: 'pincode',
    logoUrl: 'logoUrl',
    currency: 'currency',
    upiId: 'upiId',
    isActive: 'isActive',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShopScalarFieldEnum = (typeof ShopScalarFieldEnum)[keyof typeof ShopScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    authId: 'authId',
    name: 'name',
    phone: 'phone',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    isActive: 'isActive',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    inviteCode: 'inviteCode',
    inviteCodeExpiresAt: 'inviteCodeExpiresAt',
    inviteCodeUsed: 'inviteCodeUsed'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    name: 'name',
    phone: 'phone',
    email: 'email',
    address: 'address',
    notes: 'notes',
    balance: 'balance',
    creditLimit: 'creditLimit',
    qrToken: 'qrToken',
    qrTokenExpiresAt: 'qrTokenExpiresAt',
    reminderInterval: 'reminderInterval',
    lastReminderAt: 'lastReminderAt',
    isActive: 'isActive',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    customerId: 'customerId',
    type: 'type',
    amount: 'amount',
    balanceAfter: 'balanceAfter',
    description: 'description',
    referenceNumber: 'referenceNumber',
    paymentMethod: 'paymentMethod',
    transactionDate: 'transactionDate',
    createdBy: 'createdBy',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    plan: 'plan',
    status: 'status',
    maxCustomers: 'maxCustomers',
    maxUsers: 'maxUsers',
    amount: 'amount',
    currency: 'currency',
    billingCycle: 'billingCycle',
    startsAt: 'startsAt',
    expiresAt: 'expiresAt',
    cancelledAt: 'cancelledAt',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const ReminderScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    customerId: 'customerId',
    channel: 'channel',
    status: 'status',
    message: 'message',
    amountDue: 'amountDue',
    scheduledAt: 'scheduledAt',
    sentAt: 'sentAt',
    failedReason: 'failedReason',
    createdBy: 'createdBy',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReminderScalarFieldEnum = (typeof ReminderScalarFieldEnum)[keyof typeof ReminderScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    userId: 'userId',
    action: 'action',
    details: 'details',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    name: 'name',
    color: 'color',
    createdAt: 'createdAt'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const CustomerTagScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    tagId: 'tagId',
    createdAt: 'createdAt'
  };

  export type CustomerTagScalarFieldEnum = (typeof CustomerTagScalarFieldEnum)[keyof typeof CustomerTagScalarFieldEnum]


  export const TransactionNoteScalarFieldEnum: {
    id: 'id',
    transactionId: 'transactionId',
    shopId: 'shopId',
    userId: 'userId',
    content: 'content',
    isDispute: 'isDispute',
    createdAt: 'createdAt'
  };

  export type TransactionNoteScalarFieldEnum = (typeof TransactionNoteScalarFieldEnum)[keyof typeof TransactionNoteScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    userId: 'userId',
    title: 'title',
    message: 'message',
    type: 'type',
    isRead: 'isRead',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'PaymentMethod[]'
   */
  export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>
    


  /**
   * Reference to a field of type 'SubscriptionPlan'
   */
  export type EnumSubscriptionPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionPlan'>
    


  /**
   * Reference to a field of type 'SubscriptionPlan[]'
   */
  export type ListEnumSubscriptionPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionPlan[]'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus'
   */
  export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus[]'
   */
  export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ReminderChannel'
   */
  export type EnumReminderChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReminderChannel'>
    


  /**
   * Reference to a field of type 'ReminderChannel[]'
   */
  export type ListEnumReminderChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReminderChannel[]'>
    


  /**
   * Reference to a field of type 'ReminderStatus'
   */
  export type EnumReminderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReminderStatus'>
    


  /**
   * Reference to a field of type 'ReminderStatus[]'
   */
  export type ListEnumReminderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReminderStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ShopWhereInput = {
    AND?: ShopWhereInput | ShopWhereInput[]
    OR?: ShopWhereInput[]
    NOT?: ShopWhereInput | ShopWhereInput[]
    id?: UuidFilter<"Shop"> | string
    name?: StringFilter<"Shop"> | string
    phone?: StringFilter<"Shop"> | string
    email?: StringNullableFilter<"Shop"> | string | null
    address?: StringNullableFilter<"Shop"> | string | null
    city?: StringNullableFilter<"Shop"> | string | null
    state?: StringNullableFilter<"Shop"> | string | null
    pincode?: StringNullableFilter<"Shop"> | string | null
    logoUrl?: StringNullableFilter<"Shop"> | string | null
    currency?: StringFilter<"Shop"> | string
    upiId?: StringNullableFilter<"Shop"> | string | null
    isActive?: BoolFilter<"Shop"> | boolean
    deletedAt?: DateTimeNullableFilter<"Shop"> | Date | string | null
    createdAt?: DateTimeFilter<"Shop"> | Date | string
    updatedAt?: DateTimeFilter<"Shop"> | Date | string
    users?: UserListRelationFilter
    customers?: CustomerListRelationFilter
    transactions?: TransactionListRelationFilter
    subscriptions?: SubscriptionListRelationFilter
    reminders?: ReminderListRelationFilter
    notifications?: NotificationListRelationFilter
  }

  export type ShopOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    pincode?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    currency?: SortOrder
    upiId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    customers?: CustomerOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
    subscriptions?: SubscriptionOrderByRelationAggregateInput
    reminders?: ReminderOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type ShopWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phone?: string
    AND?: ShopWhereInput | ShopWhereInput[]
    OR?: ShopWhereInput[]
    NOT?: ShopWhereInput | ShopWhereInput[]
    name?: StringFilter<"Shop"> | string
    email?: StringNullableFilter<"Shop"> | string | null
    address?: StringNullableFilter<"Shop"> | string | null
    city?: StringNullableFilter<"Shop"> | string | null
    state?: StringNullableFilter<"Shop"> | string | null
    pincode?: StringNullableFilter<"Shop"> | string | null
    logoUrl?: StringNullableFilter<"Shop"> | string | null
    currency?: StringFilter<"Shop"> | string
    upiId?: StringNullableFilter<"Shop"> | string | null
    isActive?: BoolFilter<"Shop"> | boolean
    deletedAt?: DateTimeNullableFilter<"Shop"> | Date | string | null
    createdAt?: DateTimeFilter<"Shop"> | Date | string
    updatedAt?: DateTimeFilter<"Shop"> | Date | string
    users?: UserListRelationFilter
    customers?: CustomerListRelationFilter
    transactions?: TransactionListRelationFilter
    subscriptions?: SubscriptionListRelationFilter
    reminders?: ReminderListRelationFilter
    notifications?: NotificationListRelationFilter
  }, "id" | "phone">

  export type ShopOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    pincode?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    currency?: SortOrder
    upiId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShopCountOrderByAggregateInput
    _max?: ShopMaxOrderByAggregateInput
    _min?: ShopMinOrderByAggregateInput
  }

  export type ShopScalarWhereWithAggregatesInput = {
    AND?: ShopScalarWhereWithAggregatesInput | ShopScalarWhereWithAggregatesInput[]
    OR?: ShopScalarWhereWithAggregatesInput[]
    NOT?: ShopScalarWhereWithAggregatesInput | ShopScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Shop"> | string
    name?: StringWithAggregatesFilter<"Shop"> | string
    phone?: StringWithAggregatesFilter<"Shop"> | string
    email?: StringNullableWithAggregatesFilter<"Shop"> | string | null
    address?: StringNullableWithAggregatesFilter<"Shop"> | string | null
    city?: StringNullableWithAggregatesFilter<"Shop"> | string | null
    state?: StringNullableWithAggregatesFilter<"Shop"> | string | null
    pincode?: StringNullableWithAggregatesFilter<"Shop"> | string | null
    logoUrl?: StringNullableWithAggregatesFilter<"Shop"> | string | null
    currency?: StringWithAggregatesFilter<"Shop"> | string
    upiId?: StringNullableWithAggregatesFilter<"Shop"> | string | null
    isActive?: BoolWithAggregatesFilter<"Shop"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Shop"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Shop"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Shop"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    shopId?: UuidNullableFilter<"User"> | string | null
    authId?: UuidFilter<"User"> | string
    name?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    inviteCode?: StringNullableFilter<"User"> | string | null
    inviteCodeExpiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    inviteCodeUsed?: BoolFilter<"User"> | boolean
    shop?: XOR<ShopNullableScalarRelationFilter, ShopWhereInput> | null
    createdTransactions?: TransactionListRelationFilter
    createdReminders?: ReminderListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrderInput | SortOrder
    authId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inviteCode?: SortOrderInput | SortOrder
    inviteCodeExpiresAt?: SortOrderInput | SortOrder
    inviteCodeUsed?: SortOrder
    shop?: ShopOrderByWithRelationInput
    createdTransactions?: TransactionOrderByRelationAggregateInput
    createdReminders?: ReminderOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    authId?: string
    phone?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    shopId?: UuidNullableFilter<"User"> | string | null
    name?: StringFilter<"User"> | string
    passwordHash?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    inviteCode?: StringNullableFilter<"User"> | string | null
    inviteCodeExpiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    inviteCodeUsed?: BoolFilter<"User"> | boolean
    shop?: XOR<ShopNullableScalarRelationFilter, ShopWhereInput> | null
    createdTransactions?: TransactionListRelationFilter
    createdReminders?: ReminderListRelationFilter
  }, "id" | "authId" | "phone" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrderInput | SortOrder
    authId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inviteCode?: SortOrderInput | SortOrder
    inviteCodeExpiresAt?: SortOrderInput | SortOrder
    inviteCodeUsed?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    shopId?: UuidNullableWithAggregatesFilter<"User"> | string | null
    authId?: UuidWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    phone?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    inviteCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    inviteCodeExpiresAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    inviteCodeUsed?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: UuidFilter<"Customer"> | string
    shopId?: UuidFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    phone?: StringFilter<"Customer"> | string
    email?: StringNullableFilter<"Customer"> | string | null
    address?: StringNullableFilter<"Customer"> | string | null
    notes?: StringNullableFilter<"Customer"> | string | null
    balance?: DecimalFilter<"Customer"> | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFilter<"Customer"> | Decimal | DecimalJsLike | number | string
    qrToken?: StringNullableFilter<"Customer"> | string | null
    qrTokenExpiresAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    reminderInterval?: StringFilter<"Customer"> | string
    lastReminderAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    isActive?: BoolFilter<"Customer"> | boolean
    deletedAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    transactions?: TransactionListRelationFilter
    reminders?: ReminderListRelationFilter
    tags?: CustomerTagListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    balance?: SortOrder
    creditLimit?: SortOrder
    qrToken?: SortOrderInput | SortOrder
    qrTokenExpiresAt?: SortOrderInput | SortOrder
    reminderInterval?: SortOrder
    lastReminderAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shop?: ShopOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
    reminders?: ReminderOrderByRelationAggregateInput
    tags?: CustomerTagOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    qrToken?: string
    shopId_phone?: CustomerShopIdPhoneCompoundUniqueInput
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    shopId?: UuidFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    phone?: StringFilter<"Customer"> | string
    email?: StringNullableFilter<"Customer"> | string | null
    address?: StringNullableFilter<"Customer"> | string | null
    notes?: StringNullableFilter<"Customer"> | string | null
    balance?: DecimalFilter<"Customer"> | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFilter<"Customer"> | Decimal | DecimalJsLike | number | string
    qrTokenExpiresAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    reminderInterval?: StringFilter<"Customer"> | string
    lastReminderAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    isActive?: BoolFilter<"Customer"> | boolean
    deletedAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    transactions?: TransactionListRelationFilter
    reminders?: ReminderListRelationFilter
    tags?: CustomerTagListRelationFilter
  }, "id" | "qrToken" | "shopId_phone">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    balance?: SortOrder
    creditLimit?: SortOrder
    qrToken?: SortOrderInput | SortOrder
    qrTokenExpiresAt?: SortOrderInput | SortOrder
    reminderInterval?: SortOrder
    lastReminderAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _avg?: CustomerAvgOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
    _sum?: CustomerSumOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Customer"> | string
    shopId?: UuidWithAggregatesFilter<"Customer"> | string
    name?: StringWithAggregatesFilter<"Customer"> | string
    phone?: StringWithAggregatesFilter<"Customer"> | string
    email?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    address?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    balance?: DecimalWithAggregatesFilter<"Customer"> | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalWithAggregatesFilter<"Customer"> | Decimal | DecimalJsLike | number | string
    qrToken?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    qrTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    reminderInterval?: StringWithAggregatesFilter<"Customer"> | string
    lastReminderAt?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"Customer"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: UuidFilter<"Transaction"> | string
    shopId?: UuidFilter<"Transaction"> | string
    customerId?: UuidFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"Transaction"> | string | null
    referenceNumber?: StringNullableFilter<"Transaction"> | string | null
    paymentMethod?: EnumPaymentMethodNullableFilter<"Transaction"> | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFilter<"Transaction"> | Date | string
    createdBy?: UuidNullableFilter<"Transaction"> | string | null
    deletedAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    notes?: TransactionNoteListRelationFilter
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    customerId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    description?: SortOrderInput | SortOrder
    referenceNumber?: SortOrderInput | SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    transactionDate?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    shop?: ShopOrderByWithRelationInput
    customer?: CustomerOrderByWithRelationInput
    creator?: UserOrderByWithRelationInput
    notes?: TransactionNoteOrderByRelationAggregateInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    shopId?: UuidFilter<"Transaction"> | string
    customerId?: UuidFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"Transaction"> | string | null
    referenceNumber?: StringNullableFilter<"Transaction"> | string | null
    paymentMethod?: EnumPaymentMethodNullableFilter<"Transaction"> | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFilter<"Transaction"> | Date | string
    createdBy?: UuidNullableFilter<"Transaction"> | string | null
    deletedAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    notes?: TransactionNoteListRelationFilter
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    customerId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    description?: SortOrderInput | SortOrder
    referenceNumber?: SortOrderInput | SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    transactionDate?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Transaction"> | string
    shopId?: UuidWithAggregatesFilter<"Transaction"> | string
    customerId?: UuidWithAggregatesFilter<"Transaction"> | string
    type?: EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    referenceNumber?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    paymentMethod?: EnumPaymentMethodNullableWithAggregatesFilter<"Transaction"> | $Enums.PaymentMethod | null
    transactionDate?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    createdBy?: UuidNullableWithAggregatesFilter<"Transaction"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Transaction"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: UuidFilter<"Subscription"> | string
    shopId?: UuidFilter<"Subscription"> | string
    plan?: EnumSubscriptionPlanFilter<"Subscription"> | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    maxCustomers?: IntFilter<"Subscription"> | number
    maxUsers?: IntFilter<"Subscription"> | number
    amount?: DecimalFilter<"Subscription"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Subscription"> | string
    billingCycle?: StringFilter<"Subscription"> | string
    startsAt?: DateTimeFilter<"Subscription"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    maxCustomers?: SortOrder
    maxUsers?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    billingCycle?: SortOrder
    startsAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shop?: ShopOrderByWithRelationInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    shopId?: UuidFilter<"Subscription"> | string
    plan?: EnumSubscriptionPlanFilter<"Subscription"> | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    maxCustomers?: IntFilter<"Subscription"> | number
    maxUsers?: IntFilter<"Subscription"> | number
    amount?: DecimalFilter<"Subscription"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Subscription"> | string
    billingCycle?: StringFilter<"Subscription"> | string
    startsAt?: DateTimeFilter<"Subscription"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
  }, "id">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    maxCustomers?: SortOrder
    maxUsers?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    billingCycle?: SortOrder
    startsAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _avg?: SubscriptionAvgOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
    _sum?: SubscriptionSumOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Subscription"> | string
    shopId?: UuidWithAggregatesFilter<"Subscription"> | string
    plan?: EnumSubscriptionPlanWithAggregatesFilter<"Subscription"> | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusWithAggregatesFilter<"Subscription"> | $Enums.SubscriptionStatus
    maxCustomers?: IntWithAggregatesFilter<"Subscription"> | number
    maxUsers?: IntWithAggregatesFilter<"Subscription"> | number
    amount?: DecimalWithAggregatesFilter<"Subscription"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"Subscription"> | string
    billingCycle?: StringWithAggregatesFilter<"Subscription"> | string
    startsAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    cancelledAt?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
  }

  export type ReminderWhereInput = {
    AND?: ReminderWhereInput | ReminderWhereInput[]
    OR?: ReminderWhereInput[]
    NOT?: ReminderWhereInput | ReminderWhereInput[]
    id?: UuidFilter<"Reminder"> | string
    shopId?: UuidFilter<"Reminder"> | string
    customerId?: UuidFilter<"Reminder"> | string
    channel?: EnumReminderChannelFilter<"Reminder"> | $Enums.ReminderChannel
    status?: EnumReminderStatusFilter<"Reminder"> | $Enums.ReminderStatus
    message?: StringFilter<"Reminder"> | string
    amountDue?: DecimalFilter<"Reminder"> | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFilter<"Reminder"> | Date | string
    sentAt?: DateTimeNullableFilter<"Reminder"> | Date | string | null
    failedReason?: StringNullableFilter<"Reminder"> | string | null
    createdBy?: UuidNullableFilter<"Reminder"> | string | null
    deletedAt?: DateTimeNullableFilter<"Reminder"> | Date | string | null
    createdAt?: DateTimeFilter<"Reminder"> | Date | string
    updatedAt?: DateTimeFilter<"Reminder"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ReminderOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    customerId?: SortOrder
    channel?: SortOrder
    status?: SortOrder
    message?: SortOrder
    amountDue?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    failedReason?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shop?: ShopOrderByWithRelationInput
    customer?: CustomerOrderByWithRelationInput
    creator?: UserOrderByWithRelationInput
  }

  export type ReminderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReminderWhereInput | ReminderWhereInput[]
    OR?: ReminderWhereInput[]
    NOT?: ReminderWhereInput | ReminderWhereInput[]
    shopId?: UuidFilter<"Reminder"> | string
    customerId?: UuidFilter<"Reminder"> | string
    channel?: EnumReminderChannelFilter<"Reminder"> | $Enums.ReminderChannel
    status?: EnumReminderStatusFilter<"Reminder"> | $Enums.ReminderStatus
    message?: StringFilter<"Reminder"> | string
    amountDue?: DecimalFilter<"Reminder"> | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFilter<"Reminder"> | Date | string
    sentAt?: DateTimeNullableFilter<"Reminder"> | Date | string | null
    failedReason?: StringNullableFilter<"Reminder"> | string | null
    createdBy?: UuidNullableFilter<"Reminder"> | string | null
    deletedAt?: DateTimeNullableFilter<"Reminder"> | Date | string | null
    createdAt?: DateTimeFilter<"Reminder"> | Date | string
    updatedAt?: DateTimeFilter<"Reminder"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ReminderOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    customerId?: SortOrder
    channel?: SortOrder
    status?: SortOrder
    message?: SortOrder
    amountDue?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    failedReason?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReminderCountOrderByAggregateInput
    _avg?: ReminderAvgOrderByAggregateInput
    _max?: ReminderMaxOrderByAggregateInput
    _min?: ReminderMinOrderByAggregateInput
    _sum?: ReminderSumOrderByAggregateInput
  }

  export type ReminderScalarWhereWithAggregatesInput = {
    AND?: ReminderScalarWhereWithAggregatesInput | ReminderScalarWhereWithAggregatesInput[]
    OR?: ReminderScalarWhereWithAggregatesInput[]
    NOT?: ReminderScalarWhereWithAggregatesInput | ReminderScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Reminder"> | string
    shopId?: UuidWithAggregatesFilter<"Reminder"> | string
    customerId?: UuidWithAggregatesFilter<"Reminder"> | string
    channel?: EnumReminderChannelWithAggregatesFilter<"Reminder"> | $Enums.ReminderChannel
    status?: EnumReminderStatusWithAggregatesFilter<"Reminder"> | $Enums.ReminderStatus
    message?: StringWithAggregatesFilter<"Reminder"> | string
    amountDue?: DecimalWithAggregatesFilter<"Reminder"> | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeWithAggregatesFilter<"Reminder"> | Date | string
    sentAt?: DateTimeNullableWithAggregatesFilter<"Reminder"> | Date | string | null
    failedReason?: StringNullableWithAggregatesFilter<"Reminder"> | string | null
    createdBy?: UuidNullableWithAggregatesFilter<"Reminder"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Reminder"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Reminder"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Reminder"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: UuidFilter<"AuditLog"> | string
    shopId?: UuidFilter<"AuditLog"> | string
    userId?: UuidFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    details?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    shopId?: UuidFilter<"AuditLog"> | string
    userId?: UuidFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    details?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"AuditLog"> | string
    shopId?: UuidWithAggregatesFilter<"AuditLog"> | string
    userId?: UuidWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    details?: StringWithAggregatesFilter<"AuditLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: UuidFilter<"Tag"> | string
    shopId?: UuidFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    color?: StringFilter<"Tag"> | string
    createdAt?: DateTimeFilter<"Tag"> | Date | string
    customers?: CustomerTagListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    customers?: CustomerTagOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shopId_name?: TagShopIdNameCompoundUniqueInput
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    shopId?: UuidFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    color?: StringFilter<"Tag"> | string
    createdAt?: DateTimeFilter<"Tag"> | Date | string
    customers?: CustomerTagListRelationFilter
  }, "id" | "shopId_name">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Tag"> | string
    shopId?: UuidWithAggregatesFilter<"Tag"> | string
    name?: StringWithAggregatesFilter<"Tag"> | string
    color?: StringWithAggregatesFilter<"Tag"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Tag"> | Date | string
  }

  export type CustomerTagWhereInput = {
    AND?: CustomerTagWhereInput | CustomerTagWhereInput[]
    OR?: CustomerTagWhereInput[]
    NOT?: CustomerTagWhereInput | CustomerTagWhereInput[]
    id?: UuidFilter<"CustomerTag"> | string
    customerId?: UuidFilter<"CustomerTag"> | string
    tagId?: UuidFilter<"CustomerTag"> | string
    createdAt?: DateTimeFilter<"CustomerTag"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type CustomerTagOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type CustomerTagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    customerId_tagId?: CustomerTagCustomerIdTagIdCompoundUniqueInput
    AND?: CustomerTagWhereInput | CustomerTagWhereInput[]
    OR?: CustomerTagWhereInput[]
    NOT?: CustomerTagWhereInput | CustomerTagWhereInput[]
    customerId?: UuidFilter<"CustomerTag"> | string
    tagId?: UuidFilter<"CustomerTag"> | string
    createdAt?: DateTimeFilter<"CustomerTag"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "id" | "customerId_tagId">

  export type CustomerTagOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
    _count?: CustomerTagCountOrderByAggregateInput
    _max?: CustomerTagMaxOrderByAggregateInput
    _min?: CustomerTagMinOrderByAggregateInput
  }

  export type CustomerTagScalarWhereWithAggregatesInput = {
    AND?: CustomerTagScalarWhereWithAggregatesInput | CustomerTagScalarWhereWithAggregatesInput[]
    OR?: CustomerTagScalarWhereWithAggregatesInput[]
    NOT?: CustomerTagScalarWhereWithAggregatesInput | CustomerTagScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CustomerTag"> | string
    customerId?: UuidWithAggregatesFilter<"CustomerTag"> | string
    tagId?: UuidWithAggregatesFilter<"CustomerTag"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CustomerTag"> | Date | string
  }

  export type TransactionNoteWhereInput = {
    AND?: TransactionNoteWhereInput | TransactionNoteWhereInput[]
    OR?: TransactionNoteWhereInput[]
    NOT?: TransactionNoteWhereInput | TransactionNoteWhereInput[]
    id?: UuidFilter<"TransactionNote"> | string
    transactionId?: UuidFilter<"TransactionNote"> | string
    shopId?: UuidFilter<"TransactionNote"> | string
    userId?: UuidNullableFilter<"TransactionNote"> | string | null
    content?: StringFilter<"TransactionNote"> | string
    isDispute?: BoolFilter<"TransactionNote"> | boolean
    createdAt?: DateTimeFilter<"TransactionNote"> | Date | string
    transaction?: XOR<TransactionScalarRelationFilter, TransactionWhereInput>
  }

  export type TransactionNoteOrderByWithRelationInput = {
    id?: SortOrder
    transactionId?: SortOrder
    shopId?: SortOrder
    userId?: SortOrderInput | SortOrder
    content?: SortOrder
    isDispute?: SortOrder
    createdAt?: SortOrder
    transaction?: TransactionOrderByWithRelationInput
  }

  export type TransactionNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionNoteWhereInput | TransactionNoteWhereInput[]
    OR?: TransactionNoteWhereInput[]
    NOT?: TransactionNoteWhereInput | TransactionNoteWhereInput[]
    transactionId?: UuidFilter<"TransactionNote"> | string
    shopId?: UuidFilter<"TransactionNote"> | string
    userId?: UuidNullableFilter<"TransactionNote"> | string | null
    content?: StringFilter<"TransactionNote"> | string
    isDispute?: BoolFilter<"TransactionNote"> | boolean
    createdAt?: DateTimeFilter<"TransactionNote"> | Date | string
    transaction?: XOR<TransactionScalarRelationFilter, TransactionWhereInput>
  }, "id">

  export type TransactionNoteOrderByWithAggregationInput = {
    id?: SortOrder
    transactionId?: SortOrder
    shopId?: SortOrder
    userId?: SortOrderInput | SortOrder
    content?: SortOrder
    isDispute?: SortOrder
    createdAt?: SortOrder
    _count?: TransactionNoteCountOrderByAggregateInput
    _max?: TransactionNoteMaxOrderByAggregateInput
    _min?: TransactionNoteMinOrderByAggregateInput
  }

  export type TransactionNoteScalarWhereWithAggregatesInput = {
    AND?: TransactionNoteScalarWhereWithAggregatesInput | TransactionNoteScalarWhereWithAggregatesInput[]
    OR?: TransactionNoteScalarWhereWithAggregatesInput[]
    NOT?: TransactionNoteScalarWhereWithAggregatesInput | TransactionNoteScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"TransactionNote"> | string
    transactionId?: UuidWithAggregatesFilter<"TransactionNote"> | string
    shopId?: UuidWithAggregatesFilter<"TransactionNote"> | string
    userId?: UuidNullableWithAggregatesFilter<"TransactionNote"> | string | null
    content?: StringWithAggregatesFilter<"TransactionNote"> | string
    isDispute?: BoolWithAggregatesFilter<"TransactionNote"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TransactionNote"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: UuidFilter<"Notification"> | string
    shopId?: UuidFilter<"Notification"> | string
    userId?: UuidFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    shop?: ShopOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    shopId?: UuidFilter<"Notification"> | string
    userId?: UuidFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Notification"> | string
    shopId?: UuidWithAggregatesFilter<"Notification"> | string
    userId?: UuidWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type ShopCreateInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    pincode?: string | null
    logoUrl?: string | null
    currency?: string
    upiId?: string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutShopInput
    customers?: CustomerCreateNestedManyWithoutShopInput
    transactions?: TransactionCreateNestedManyWithoutShopInput
    subscriptions?: SubscriptionCreateNestedManyWithoutShopInput
    reminders?: ReminderCreateNestedManyWithoutShopInput
    notifications?: NotificationCreateNestedManyWithoutShopInput
  }

  export type ShopUncheckedCreateInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    pincode?: string | null
    logoUrl?: string | null
    currency?: string
    upiId?: string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutShopInput
    customers?: CustomerUncheckedCreateNestedManyWithoutShopInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutShopInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutShopInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutShopInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutShopInput
  }

  export type ShopUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutShopNestedInput
    customers?: CustomerUpdateManyWithoutShopNestedInput
    transactions?: TransactionUpdateManyWithoutShopNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutShopNestedInput
    reminders?: ReminderUpdateManyWithoutShopNestedInput
    notifications?: NotificationUpdateManyWithoutShopNestedInput
  }

  export type ShopUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutShopNestedInput
    customers?: CustomerUncheckedUpdateManyWithoutShopNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutShopNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutShopNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutShopNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutShopNestedInput
  }

  export type ShopCreateManyInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    pincode?: string | null
    logoUrl?: string | null
    currency?: string
    upiId?: string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    authId: string
    name: string
    phone: string
    email?: string | null
    passwordHash?: string | null
    role?: string
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode?: string | null
    inviteCodeExpiresAt?: Date | string | null
    inviteCodeUsed?: boolean
    shop?: ShopCreateNestedOneWithoutUsersInput
    createdTransactions?: TransactionCreateNestedManyWithoutCreatorInput
    createdReminders?: ReminderCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    shopId?: string | null
    authId: string
    name: string
    phone: string
    email?: string | null
    passwordHash?: string | null
    role?: string
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode?: string | null
    inviteCodeExpiresAt?: Date | string | null
    inviteCodeUsed?: boolean
    createdTransactions?: TransactionUncheckedCreateNestedManyWithoutCreatorInput
    createdReminders?: ReminderUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inviteCodeUsed?: BoolFieldUpdateOperationsInput | boolean
    shop?: ShopUpdateOneWithoutUsersNestedInput
    createdTransactions?: TransactionUpdateManyWithoutCreatorNestedInput
    createdReminders?: ReminderUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: NullableStringFieldUpdateOperationsInput | string | null
    authId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inviteCodeUsed?: BoolFieldUpdateOperationsInput | boolean
    createdTransactions?: TransactionUncheckedUpdateManyWithoutCreatorNestedInput
    createdReminders?: ReminderUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    shopId?: string | null
    authId: string
    name: string
    phone: string
    email?: string | null
    passwordHash?: string | null
    role?: string
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode?: string | null
    inviteCodeExpiresAt?: Date | string | null
    inviteCodeUsed?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inviteCodeUsed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: NullableStringFieldUpdateOperationsInput | string | null
    authId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inviteCodeUsed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CustomerCreateInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    notes?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    creditLimit?: Decimal | DecimalJsLike | number | string
    qrToken?: string | null
    qrTokenExpiresAt?: Date | string | null
    reminderInterval?: string
    lastReminderAt?: Date | string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutCustomersInput
    transactions?: TransactionCreateNestedManyWithoutCustomerInput
    reminders?: ReminderCreateNestedManyWithoutCustomerInput
    tags?: CustomerTagCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    shopId: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    notes?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    creditLimit?: Decimal | DecimalJsLike | number | string
    qrToken?: string | null
    qrTokenExpiresAt?: Date | string | null
    reminderInterval?: string
    lastReminderAt?: Date | string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutCustomerInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutCustomerInput
    tags?: CustomerTagUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reminderInterval?: StringFieldUpdateOperationsInput | string
    lastReminderAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutCustomersNestedInput
    transactions?: TransactionUpdateManyWithoutCustomerNestedInput
    reminders?: ReminderUpdateManyWithoutCustomerNestedInput
    tags?: CustomerTagUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reminderInterval?: StringFieldUpdateOperationsInput | string
    lastReminderAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutCustomerNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutCustomerNestedInput
    tags?: CustomerTagUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    shopId: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    notes?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    creditLimit?: Decimal | DecimalJsLike | number | string
    qrToken?: string | null
    qrTokenExpiresAt?: Date | string | null
    reminderInterval?: string
    lastReminderAt?: Date | string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reminderInterval?: StringFieldUpdateOperationsInput | string
    lastReminderAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reminderInterval?: StringFieldUpdateOperationsInput | string
    lastReminderAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    description?: string | null
    referenceNumber?: string | null
    paymentMethod?: $Enums.PaymentMethod | null
    transactionDate?: Date | string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    shop: ShopCreateNestedOneWithoutTransactionsInput
    customer: CustomerCreateNestedOneWithoutTransactionsInput
    creator?: UserCreateNestedOneWithoutCreatedTransactionsInput
    notes?: TransactionNoteCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    shopId: string
    customerId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    description?: string | null
    referenceNumber?: string | null
    paymentMethod?: $Enums.PaymentMethod | null
    transactionDate?: Date | string
    createdBy?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    notes?: TransactionNoteUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutTransactionsNestedInput
    customer?: CustomerUpdateOneRequiredWithoutTransactionsNestedInput
    creator?: UserUpdateOneWithoutCreatedTransactionsNestedInput
    notes?: TransactionNoteUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: TransactionNoteUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionCreateManyInput = {
    id?: string
    shopId: string
    customerId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    description?: string | null
    referenceNumber?: string | null
    paymentMethod?: $Enums.PaymentMethod | null
    transactionDate?: Date | string
    createdBy?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateInput = {
    id?: string
    plan?: $Enums.SubscriptionPlan
    status?: $Enums.SubscriptionStatus
    maxCustomers?: number
    maxUsers?: number
    amount?: Decimal | DecimalJsLike | number | string
    currency?: string
    billingCycle?: string
    startsAt?: Date | string
    expiresAt?: Date | string | null
    cancelledAt?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    shopId: string
    plan?: $Enums.SubscriptionPlan
    status?: $Enums.SubscriptionStatus
    maxCustomers?: number
    maxUsers?: number
    amount?: Decimal | DecimalJsLike | number | string
    currency?: string
    billingCycle?: string
    startsAt?: Date | string
    expiresAt?: Date | string | null
    cancelledAt?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    maxCustomers?: IntFieldUpdateOperationsInput | number
    maxUsers?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    billingCycle?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    plan?: EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    maxCustomers?: IntFieldUpdateOperationsInput | number
    maxUsers?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    billingCycle?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    shopId: string
    plan?: $Enums.SubscriptionPlan
    status?: $Enums.SubscriptionStatus
    maxCustomers?: number
    maxUsers?: number
    amount?: Decimal | DecimalJsLike | number | string
    currency?: string
    billingCycle?: string
    startsAt?: Date | string
    expiresAt?: Date | string | null
    cancelledAt?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    maxCustomers?: IntFieldUpdateOperationsInput | number
    maxUsers?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    billingCycle?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    plan?: EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    maxCustomers?: IntFieldUpdateOperationsInput | number
    maxUsers?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    billingCycle?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderCreateInput = {
    id?: string
    channel?: $Enums.ReminderChannel
    status?: $Enums.ReminderStatus
    message: string
    amountDue: Decimal | DecimalJsLike | number | string
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    failedReason?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutRemindersInput
    customer: CustomerCreateNestedOneWithoutRemindersInput
    creator?: UserCreateNestedOneWithoutCreatedRemindersInput
  }

  export type ReminderUncheckedCreateInput = {
    id?: string
    shopId: string
    customerId: string
    channel?: $Enums.ReminderChannel
    status?: $Enums.ReminderStatus
    message: string
    amountDue: Decimal | DecimalJsLike | number | string
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    failedReason?: string | null
    createdBy?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReminderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    message?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedReason?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutRemindersNestedInput
    customer?: CustomerUpdateOneRequiredWithoutRemindersNestedInput
    creator?: UserUpdateOneWithoutCreatedRemindersNestedInput
  }

  export type ReminderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    message?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderCreateManyInput = {
    id?: string
    shopId: string
    customerId: string
    channel?: $Enums.ReminderChannel
    status?: $Enums.ReminderStatus
    message: string
    amountDue: Decimal | DecimalJsLike | number | string
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    failedReason?: string | null
    createdBy?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReminderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    message?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedReason?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    message?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    shopId: string
    userId: string
    action: string
    details: string
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    shopId: string
    userId: string
    action: string
    details: string
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    shopId: string
    userId: string
    action: string
    details: string
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagCreateInput = {
    id?: string
    shopId: string
    name: string
    color?: string
    createdAt?: Date | string
    customers?: CustomerTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateInput = {
    id?: string
    shopId: string
    name: string
    color?: string
    createdAt?: Date | string
    customers?: CustomerTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagCreateManyInput = {
    id?: string
    shopId: string
    name: string
    color?: string
    createdAt?: Date | string
  }

  export type TagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerTagCreateInput = {
    id?: string
    createdAt?: Date | string
    customer: CustomerCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutCustomersInput
  }

  export type CustomerTagUncheckedCreateInput = {
    id?: string
    customerId: string
    tagId: string
    createdAt?: Date | string
  }

  export type CustomerTagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutCustomersNestedInput
  }

  export type CustomerTagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerTagCreateManyInput = {
    id?: string
    customerId: string
    tagId: string
    createdAt?: Date | string
  }

  export type CustomerTagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerTagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionNoteCreateInput = {
    id?: string
    shopId: string
    userId?: string | null
    content: string
    isDispute?: boolean
    createdAt?: Date | string
    transaction: TransactionCreateNestedOneWithoutNotesInput
  }

  export type TransactionNoteUncheckedCreateInput = {
    id?: string
    transactionId: string
    shopId: string
    userId?: string | null
    content: string
    isDispute?: boolean
    createdAt?: Date | string
  }

  export type TransactionNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    isDispute?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: TransactionUpdateOneRequiredWithoutNotesNestedInput
  }

  export type TransactionNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    isDispute?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionNoteCreateManyInput = {
    id?: string
    transactionId: string
    shopId: string
    userId?: string | null
    content: string
    isDispute?: boolean
    createdAt?: Date | string
  }

  export type TransactionNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    isDispute?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    isDispute?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    userId: string
    title: string
    message: string
    type: string
    isRead?: boolean
    createdAt?: Date | string
    shop: ShopCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    shopId: string
    userId: string
    title: string
    message: string
    type: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    shopId: string
    userId: string
    title: string
    message: string
    type: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type CustomerListRelationFilter = {
    every?: CustomerWhereInput
    some?: CustomerWhereInput
    none?: CustomerWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type SubscriptionListRelationFilter = {
    every?: SubscriptionWhereInput
    some?: SubscriptionWhereInput
    none?: SubscriptionWhereInput
  }

  export type ReminderListRelationFilter = {
    every?: ReminderWhereInput
    some?: ReminderWhereInput
    none?: ReminderWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReminderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ShopCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    logoUrl?: SortOrder
    currency?: SortOrder
    upiId?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    logoUrl?: SortOrder
    currency?: SortOrder
    upiId?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    logoUrl?: SortOrder
    currency?: SortOrder
    upiId?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type ShopNullableScalarRelationFilter = {
    is?: ShopWhereInput | null
    isNot?: ShopWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    authId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inviteCode?: SortOrder
    inviteCodeExpiresAt?: SortOrder
    inviteCodeUsed?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    authId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inviteCode?: SortOrder
    inviteCodeExpiresAt?: SortOrder
    inviteCodeUsed?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    authId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inviteCode?: SortOrder
    inviteCodeExpiresAt?: SortOrder
    inviteCodeUsed?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type ShopScalarRelationFilter = {
    is?: ShopWhereInput
    isNot?: ShopWhereInput
  }

  export type CustomerTagListRelationFilter = {
    every?: CustomerTagWhereInput
    some?: CustomerTagWhereInput
    none?: CustomerTagWhereInput
  }

  export type CustomerTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerShopIdPhoneCompoundUniqueInput = {
    shopId: string
    phone: string
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    notes?: SortOrder
    balance?: SortOrder
    creditLimit?: SortOrder
    qrToken?: SortOrder
    qrTokenExpiresAt?: SortOrder
    reminderInterval?: SortOrder
    lastReminderAt?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerAvgOrderByAggregateInput = {
    balance?: SortOrder
    creditLimit?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    notes?: SortOrder
    balance?: SortOrder
    creditLimit?: SortOrder
    qrToken?: SortOrder
    qrTokenExpiresAt?: SortOrder
    reminderInterval?: SortOrder
    lastReminderAt?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    notes?: SortOrder
    balance?: SortOrder
    creditLimit?: SortOrder
    qrToken?: SortOrder
    qrTokenExpiresAt?: SortOrder
    reminderInterval?: SortOrder
    lastReminderAt?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerSumOrderByAggregateInput = {
    balance?: SortOrder
    creditLimit?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type EnumPaymentMethodNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPaymentMethodNullableFilter<$PrismaModel> | $Enums.PaymentMethod | null
  }

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TransactionNoteListRelationFilter = {
    every?: TransactionNoteWhereInput
    some?: TransactionNoteWhereInput
    none?: TransactionNoteWhereInput
  }

  export type TransactionNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    customerId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    description?: SortOrder
    referenceNumber?: SortOrder
    paymentMethod?: SortOrder
    transactionDate?: SortOrder
    createdBy?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    customerId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    description?: SortOrder
    referenceNumber?: SortOrder
    paymentMethod?: SortOrder
    transactionDate?: SortOrder
    createdBy?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    customerId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    description?: SortOrder
    referenceNumber?: SortOrder
    paymentMethod?: SortOrder
    transactionDate?: SortOrder
    createdBy?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type EnumPaymentMethodNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPaymentMethodNullableWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodNullableFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodNullableFilter<$PrismaModel>
  }

  export type EnumSubscriptionPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionPlan | EnumSubscriptionPlanFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionPlanFilter<$PrismaModel> | $Enums.SubscriptionPlan
  }

  export type EnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    maxCustomers?: SortOrder
    maxUsers?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    billingCycle?: SortOrder
    startsAt?: SortOrder
    expiresAt?: SortOrder
    cancelledAt?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionAvgOrderByAggregateInput = {
    maxCustomers?: SortOrder
    maxUsers?: SortOrder
    amount?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    maxCustomers?: SortOrder
    maxUsers?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    billingCycle?: SortOrder
    startsAt?: SortOrder
    expiresAt?: SortOrder
    cancelledAt?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    maxCustomers?: SortOrder
    maxUsers?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    billingCycle?: SortOrder
    startsAt?: SortOrder
    expiresAt?: SortOrder
    cancelledAt?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionSumOrderByAggregateInput = {
    maxCustomers?: SortOrder
    maxUsers?: SortOrder
    amount?: SortOrder
  }

  export type EnumSubscriptionPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionPlan | EnumSubscriptionPlanFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionPlanWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionPlan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionPlanFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionPlanFilter<$PrismaModel>
  }

  export type EnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumReminderChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderChannel | EnumReminderChannelFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderChannel[] | ListEnumReminderChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderChannel[] | ListEnumReminderChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderChannelFilter<$PrismaModel> | $Enums.ReminderChannel
  }

  export type EnumReminderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | EnumReminderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderStatusFilter<$PrismaModel> | $Enums.ReminderStatus
  }

  export type ReminderCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    customerId?: SortOrder
    channel?: SortOrder
    status?: SortOrder
    message?: SortOrder
    amountDue?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrder
    failedReason?: SortOrder
    createdBy?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReminderAvgOrderByAggregateInput = {
    amountDue?: SortOrder
  }

  export type ReminderMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    customerId?: SortOrder
    channel?: SortOrder
    status?: SortOrder
    message?: SortOrder
    amountDue?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrder
    failedReason?: SortOrder
    createdBy?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReminderMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    customerId?: SortOrder
    channel?: SortOrder
    status?: SortOrder
    message?: SortOrder
    amountDue?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrder
    failedReason?: SortOrder
    createdBy?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReminderSumOrderByAggregateInput = {
    amountDue?: SortOrder
  }

  export type EnumReminderChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderChannel | EnumReminderChannelFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderChannel[] | ListEnumReminderChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderChannel[] | ListEnumReminderChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderChannelWithAggregatesFilter<$PrismaModel> | $Enums.ReminderChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReminderChannelFilter<$PrismaModel>
    _max?: NestedEnumReminderChannelFilter<$PrismaModel>
  }

  export type EnumReminderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | EnumReminderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReminderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReminderStatusFilter<$PrismaModel>
    _max?: NestedEnumReminderStatusFilter<$PrismaModel>
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type TagShopIdNameCompoundUniqueInput = {
    shopId: string
    name: string
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
  }

  export type TagScalarRelationFilter = {
    is?: TagWhereInput
    isNot?: TagWhereInput
  }

  export type CustomerTagCustomerIdTagIdCompoundUniqueInput = {
    customerId: string
    tagId: string
  }

  export type CustomerTagCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomerTagMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomerTagMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionScalarRelationFilter = {
    is?: TransactionWhereInput
    isNot?: TransactionWhereInput
  }

  export type TransactionNoteCountOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    shopId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    isDispute?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    shopId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    isDispute?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionNoteMinOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    shopId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    isDispute?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCreateNestedManyWithoutShopInput = {
    create?: XOR<UserCreateWithoutShopInput, UserUncheckedCreateWithoutShopInput> | UserCreateWithoutShopInput[] | UserUncheckedCreateWithoutShopInput[]
    connectOrCreate?: UserCreateOrConnectWithoutShopInput | UserCreateOrConnectWithoutShopInput[]
    createMany?: UserCreateManyShopInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type CustomerCreateNestedManyWithoutShopInput = {
    create?: XOR<CustomerCreateWithoutShopInput, CustomerUncheckedCreateWithoutShopInput> | CustomerCreateWithoutShopInput[] | CustomerUncheckedCreateWithoutShopInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutShopInput | CustomerCreateOrConnectWithoutShopInput[]
    createMany?: CustomerCreateManyShopInputEnvelope
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutShopInput = {
    create?: XOR<TransactionCreateWithoutShopInput, TransactionUncheckedCreateWithoutShopInput> | TransactionCreateWithoutShopInput[] | TransactionUncheckedCreateWithoutShopInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutShopInput | TransactionCreateOrConnectWithoutShopInput[]
    createMany?: TransactionCreateManyShopInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type SubscriptionCreateNestedManyWithoutShopInput = {
    create?: XOR<SubscriptionCreateWithoutShopInput, SubscriptionUncheckedCreateWithoutShopInput> | SubscriptionCreateWithoutShopInput[] | SubscriptionUncheckedCreateWithoutShopInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutShopInput | SubscriptionCreateOrConnectWithoutShopInput[]
    createMany?: SubscriptionCreateManyShopInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type ReminderCreateNestedManyWithoutShopInput = {
    create?: XOR<ReminderCreateWithoutShopInput, ReminderUncheckedCreateWithoutShopInput> | ReminderCreateWithoutShopInput[] | ReminderUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutShopInput | ReminderCreateOrConnectWithoutShopInput[]
    createMany?: ReminderCreateManyShopInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutShopInput = {
    create?: XOR<NotificationCreateWithoutShopInput, NotificationUncheckedCreateWithoutShopInput> | NotificationCreateWithoutShopInput[] | NotificationUncheckedCreateWithoutShopInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutShopInput | NotificationCreateOrConnectWithoutShopInput[]
    createMany?: NotificationCreateManyShopInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutShopInput = {
    create?: XOR<UserCreateWithoutShopInput, UserUncheckedCreateWithoutShopInput> | UserCreateWithoutShopInput[] | UserUncheckedCreateWithoutShopInput[]
    connectOrCreate?: UserCreateOrConnectWithoutShopInput | UserCreateOrConnectWithoutShopInput[]
    createMany?: UserCreateManyShopInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type CustomerUncheckedCreateNestedManyWithoutShopInput = {
    create?: XOR<CustomerCreateWithoutShopInput, CustomerUncheckedCreateWithoutShopInput> | CustomerCreateWithoutShopInput[] | CustomerUncheckedCreateWithoutShopInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutShopInput | CustomerCreateOrConnectWithoutShopInput[]
    createMany?: CustomerCreateManyShopInputEnvelope
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutShopInput = {
    create?: XOR<TransactionCreateWithoutShopInput, TransactionUncheckedCreateWithoutShopInput> | TransactionCreateWithoutShopInput[] | TransactionUncheckedCreateWithoutShopInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutShopInput | TransactionCreateOrConnectWithoutShopInput[]
    createMany?: TransactionCreateManyShopInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutShopInput = {
    create?: XOR<SubscriptionCreateWithoutShopInput, SubscriptionUncheckedCreateWithoutShopInput> | SubscriptionCreateWithoutShopInput[] | SubscriptionUncheckedCreateWithoutShopInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutShopInput | SubscriptionCreateOrConnectWithoutShopInput[]
    createMany?: SubscriptionCreateManyShopInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type ReminderUncheckedCreateNestedManyWithoutShopInput = {
    create?: XOR<ReminderCreateWithoutShopInput, ReminderUncheckedCreateWithoutShopInput> | ReminderCreateWithoutShopInput[] | ReminderUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutShopInput | ReminderCreateOrConnectWithoutShopInput[]
    createMany?: ReminderCreateManyShopInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutShopInput = {
    create?: XOR<NotificationCreateWithoutShopInput, NotificationUncheckedCreateWithoutShopInput> | NotificationCreateWithoutShopInput[] | NotificationUncheckedCreateWithoutShopInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutShopInput | NotificationCreateOrConnectWithoutShopInput[]
    createMany?: NotificationCreateManyShopInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutShopNestedInput = {
    create?: XOR<UserCreateWithoutShopInput, UserUncheckedCreateWithoutShopInput> | UserCreateWithoutShopInput[] | UserUncheckedCreateWithoutShopInput[]
    connectOrCreate?: UserCreateOrConnectWithoutShopInput | UserCreateOrConnectWithoutShopInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutShopInput | UserUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: UserCreateManyShopInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutShopInput | UserUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: UserUpdateManyWithWhereWithoutShopInput | UserUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CustomerUpdateManyWithoutShopNestedInput = {
    create?: XOR<CustomerCreateWithoutShopInput, CustomerUncheckedCreateWithoutShopInput> | CustomerCreateWithoutShopInput[] | CustomerUncheckedCreateWithoutShopInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutShopInput | CustomerCreateOrConnectWithoutShopInput[]
    upsert?: CustomerUpsertWithWhereUniqueWithoutShopInput | CustomerUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: CustomerCreateManyShopInputEnvelope
    set?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    disconnect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    delete?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    update?: CustomerUpdateWithWhereUniqueWithoutShopInput | CustomerUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: CustomerUpdateManyWithWhereWithoutShopInput | CustomerUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutShopNestedInput = {
    create?: XOR<TransactionCreateWithoutShopInput, TransactionUncheckedCreateWithoutShopInput> | TransactionCreateWithoutShopInput[] | TransactionUncheckedCreateWithoutShopInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutShopInput | TransactionCreateOrConnectWithoutShopInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutShopInput | TransactionUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: TransactionCreateManyShopInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutShopInput | TransactionUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutShopInput | TransactionUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type SubscriptionUpdateManyWithoutShopNestedInput = {
    create?: XOR<SubscriptionCreateWithoutShopInput, SubscriptionUncheckedCreateWithoutShopInput> | SubscriptionCreateWithoutShopInput[] | SubscriptionUncheckedCreateWithoutShopInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutShopInput | SubscriptionCreateOrConnectWithoutShopInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutShopInput | SubscriptionUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: SubscriptionCreateManyShopInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutShopInput | SubscriptionUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutShopInput | SubscriptionUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type ReminderUpdateManyWithoutShopNestedInput = {
    create?: XOR<ReminderCreateWithoutShopInput, ReminderUncheckedCreateWithoutShopInput> | ReminderCreateWithoutShopInput[] | ReminderUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutShopInput | ReminderCreateOrConnectWithoutShopInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutShopInput | ReminderUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: ReminderCreateManyShopInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutShopInput | ReminderUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutShopInput | ReminderUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutShopNestedInput = {
    create?: XOR<NotificationCreateWithoutShopInput, NotificationUncheckedCreateWithoutShopInput> | NotificationCreateWithoutShopInput[] | NotificationUncheckedCreateWithoutShopInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutShopInput | NotificationCreateOrConnectWithoutShopInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutShopInput | NotificationUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: NotificationCreateManyShopInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutShopInput | NotificationUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutShopInput | NotificationUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutShopNestedInput = {
    create?: XOR<UserCreateWithoutShopInput, UserUncheckedCreateWithoutShopInput> | UserCreateWithoutShopInput[] | UserUncheckedCreateWithoutShopInput[]
    connectOrCreate?: UserCreateOrConnectWithoutShopInput | UserCreateOrConnectWithoutShopInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutShopInput | UserUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: UserCreateManyShopInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutShopInput | UserUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: UserUpdateManyWithWhereWithoutShopInput | UserUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CustomerUncheckedUpdateManyWithoutShopNestedInput = {
    create?: XOR<CustomerCreateWithoutShopInput, CustomerUncheckedCreateWithoutShopInput> | CustomerCreateWithoutShopInput[] | CustomerUncheckedCreateWithoutShopInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutShopInput | CustomerCreateOrConnectWithoutShopInput[]
    upsert?: CustomerUpsertWithWhereUniqueWithoutShopInput | CustomerUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: CustomerCreateManyShopInputEnvelope
    set?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    disconnect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    delete?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    update?: CustomerUpdateWithWhereUniqueWithoutShopInput | CustomerUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: CustomerUpdateManyWithWhereWithoutShopInput | CustomerUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutShopNestedInput = {
    create?: XOR<TransactionCreateWithoutShopInput, TransactionUncheckedCreateWithoutShopInput> | TransactionCreateWithoutShopInput[] | TransactionUncheckedCreateWithoutShopInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutShopInput | TransactionCreateOrConnectWithoutShopInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutShopInput | TransactionUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: TransactionCreateManyShopInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutShopInput | TransactionUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutShopInput | TransactionUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutShopNestedInput = {
    create?: XOR<SubscriptionCreateWithoutShopInput, SubscriptionUncheckedCreateWithoutShopInput> | SubscriptionCreateWithoutShopInput[] | SubscriptionUncheckedCreateWithoutShopInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutShopInput | SubscriptionCreateOrConnectWithoutShopInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutShopInput | SubscriptionUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: SubscriptionCreateManyShopInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutShopInput | SubscriptionUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutShopInput | SubscriptionUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type ReminderUncheckedUpdateManyWithoutShopNestedInput = {
    create?: XOR<ReminderCreateWithoutShopInput, ReminderUncheckedCreateWithoutShopInput> | ReminderCreateWithoutShopInput[] | ReminderUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutShopInput | ReminderCreateOrConnectWithoutShopInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutShopInput | ReminderUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: ReminderCreateManyShopInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutShopInput | ReminderUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutShopInput | ReminderUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutShopNestedInput = {
    create?: XOR<NotificationCreateWithoutShopInput, NotificationUncheckedCreateWithoutShopInput> | NotificationCreateWithoutShopInput[] | NotificationUncheckedCreateWithoutShopInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutShopInput | NotificationCreateOrConnectWithoutShopInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutShopInput | NotificationUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: NotificationCreateManyShopInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutShopInput | NotificationUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutShopInput | NotificationUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type ShopCreateNestedOneWithoutUsersInput = {
    create?: XOR<ShopCreateWithoutUsersInput, ShopUncheckedCreateWithoutUsersInput>
    connectOrCreate?: ShopCreateOrConnectWithoutUsersInput
    connect?: ShopWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutCreatorInput = {
    create?: XOR<TransactionCreateWithoutCreatorInput, TransactionUncheckedCreateWithoutCreatorInput> | TransactionCreateWithoutCreatorInput[] | TransactionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCreatorInput | TransactionCreateOrConnectWithoutCreatorInput[]
    createMany?: TransactionCreateManyCreatorInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type ReminderCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ReminderCreateWithoutCreatorInput, ReminderUncheckedCreateWithoutCreatorInput> | ReminderCreateWithoutCreatorInput[] | ReminderUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutCreatorInput | ReminderCreateOrConnectWithoutCreatorInput[]
    createMany?: ReminderCreateManyCreatorInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<TransactionCreateWithoutCreatorInput, TransactionUncheckedCreateWithoutCreatorInput> | TransactionCreateWithoutCreatorInput[] | TransactionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCreatorInput | TransactionCreateOrConnectWithoutCreatorInput[]
    createMany?: TransactionCreateManyCreatorInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type ReminderUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ReminderCreateWithoutCreatorInput, ReminderUncheckedCreateWithoutCreatorInput> | ReminderCreateWithoutCreatorInput[] | ReminderUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutCreatorInput | ReminderCreateOrConnectWithoutCreatorInput[]
    createMany?: ReminderCreateManyCreatorInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type ShopUpdateOneWithoutUsersNestedInput = {
    create?: XOR<ShopCreateWithoutUsersInput, ShopUncheckedCreateWithoutUsersInput>
    connectOrCreate?: ShopCreateOrConnectWithoutUsersInput
    upsert?: ShopUpsertWithoutUsersInput
    disconnect?: ShopWhereInput | boolean
    delete?: ShopWhereInput | boolean
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutUsersInput, ShopUpdateWithoutUsersInput>, ShopUncheckedUpdateWithoutUsersInput>
  }

  export type TransactionUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<TransactionCreateWithoutCreatorInput, TransactionUncheckedCreateWithoutCreatorInput> | TransactionCreateWithoutCreatorInput[] | TransactionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCreatorInput | TransactionCreateOrConnectWithoutCreatorInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutCreatorInput | TransactionUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: TransactionCreateManyCreatorInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutCreatorInput | TransactionUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutCreatorInput | TransactionUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type ReminderUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ReminderCreateWithoutCreatorInput, ReminderUncheckedCreateWithoutCreatorInput> | ReminderCreateWithoutCreatorInput[] | ReminderUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutCreatorInput | ReminderCreateOrConnectWithoutCreatorInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutCreatorInput | ReminderUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ReminderCreateManyCreatorInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutCreatorInput | ReminderUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutCreatorInput | ReminderUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<TransactionCreateWithoutCreatorInput, TransactionUncheckedCreateWithoutCreatorInput> | TransactionCreateWithoutCreatorInput[] | TransactionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCreatorInput | TransactionCreateOrConnectWithoutCreatorInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutCreatorInput | TransactionUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: TransactionCreateManyCreatorInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutCreatorInput | TransactionUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutCreatorInput | TransactionUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type ReminderUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ReminderCreateWithoutCreatorInput, ReminderUncheckedCreateWithoutCreatorInput> | ReminderCreateWithoutCreatorInput[] | ReminderUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutCreatorInput | ReminderCreateOrConnectWithoutCreatorInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutCreatorInput | ReminderUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ReminderCreateManyCreatorInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutCreatorInput | ReminderUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutCreatorInput | ReminderUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type ShopCreateNestedOneWithoutCustomersInput = {
    create?: XOR<ShopCreateWithoutCustomersInput, ShopUncheckedCreateWithoutCustomersInput>
    connectOrCreate?: ShopCreateOrConnectWithoutCustomersInput
    connect?: ShopWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutCustomerInput = {
    create?: XOR<TransactionCreateWithoutCustomerInput, TransactionUncheckedCreateWithoutCustomerInput> | TransactionCreateWithoutCustomerInput[] | TransactionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCustomerInput | TransactionCreateOrConnectWithoutCustomerInput[]
    createMany?: TransactionCreateManyCustomerInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type ReminderCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ReminderCreateWithoutCustomerInput, ReminderUncheckedCreateWithoutCustomerInput> | ReminderCreateWithoutCustomerInput[] | ReminderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutCustomerInput | ReminderCreateOrConnectWithoutCustomerInput[]
    createMany?: ReminderCreateManyCustomerInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type CustomerTagCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerTagCreateWithoutCustomerInput, CustomerTagUncheckedCreateWithoutCustomerInput> | CustomerTagCreateWithoutCustomerInput[] | CustomerTagUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerTagCreateOrConnectWithoutCustomerInput | CustomerTagCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerTagCreateManyCustomerInputEnvelope
    connect?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<TransactionCreateWithoutCustomerInput, TransactionUncheckedCreateWithoutCustomerInput> | TransactionCreateWithoutCustomerInput[] | TransactionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCustomerInput | TransactionCreateOrConnectWithoutCustomerInput[]
    createMany?: TransactionCreateManyCustomerInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type ReminderUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ReminderCreateWithoutCustomerInput, ReminderUncheckedCreateWithoutCustomerInput> | ReminderCreateWithoutCustomerInput[] | ReminderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutCustomerInput | ReminderCreateOrConnectWithoutCustomerInput[]
    createMany?: ReminderCreateManyCustomerInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type CustomerTagUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerTagCreateWithoutCustomerInput, CustomerTagUncheckedCreateWithoutCustomerInput> | CustomerTagCreateWithoutCustomerInput[] | CustomerTagUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerTagCreateOrConnectWithoutCustomerInput | CustomerTagCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerTagCreateManyCustomerInputEnvelope
    connect?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type ShopUpdateOneRequiredWithoutCustomersNestedInput = {
    create?: XOR<ShopCreateWithoutCustomersInput, ShopUncheckedCreateWithoutCustomersInput>
    connectOrCreate?: ShopCreateOrConnectWithoutCustomersInput
    upsert?: ShopUpsertWithoutCustomersInput
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutCustomersInput, ShopUpdateWithoutCustomersInput>, ShopUncheckedUpdateWithoutCustomersInput>
  }

  export type TransactionUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<TransactionCreateWithoutCustomerInput, TransactionUncheckedCreateWithoutCustomerInput> | TransactionCreateWithoutCustomerInput[] | TransactionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCustomerInput | TransactionCreateOrConnectWithoutCustomerInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutCustomerInput | TransactionUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: TransactionCreateManyCustomerInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutCustomerInput | TransactionUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutCustomerInput | TransactionUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type ReminderUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ReminderCreateWithoutCustomerInput, ReminderUncheckedCreateWithoutCustomerInput> | ReminderCreateWithoutCustomerInput[] | ReminderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutCustomerInput | ReminderCreateOrConnectWithoutCustomerInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutCustomerInput | ReminderUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ReminderCreateManyCustomerInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutCustomerInput | ReminderUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutCustomerInput | ReminderUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type CustomerTagUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerTagCreateWithoutCustomerInput, CustomerTagUncheckedCreateWithoutCustomerInput> | CustomerTagCreateWithoutCustomerInput[] | CustomerTagUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerTagCreateOrConnectWithoutCustomerInput | CustomerTagCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerTagUpsertWithWhereUniqueWithoutCustomerInput | CustomerTagUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerTagCreateManyCustomerInputEnvelope
    set?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    disconnect?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    delete?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    connect?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    update?: CustomerTagUpdateWithWhereUniqueWithoutCustomerInput | CustomerTagUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerTagUpdateManyWithWhereWithoutCustomerInput | CustomerTagUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerTagScalarWhereInput | CustomerTagScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<TransactionCreateWithoutCustomerInput, TransactionUncheckedCreateWithoutCustomerInput> | TransactionCreateWithoutCustomerInput[] | TransactionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCustomerInput | TransactionCreateOrConnectWithoutCustomerInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutCustomerInput | TransactionUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: TransactionCreateManyCustomerInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutCustomerInput | TransactionUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutCustomerInput | TransactionUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type ReminderUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ReminderCreateWithoutCustomerInput, ReminderUncheckedCreateWithoutCustomerInput> | ReminderCreateWithoutCustomerInput[] | ReminderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutCustomerInput | ReminderCreateOrConnectWithoutCustomerInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutCustomerInput | ReminderUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ReminderCreateManyCustomerInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutCustomerInput | ReminderUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutCustomerInput | ReminderUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type CustomerTagUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerTagCreateWithoutCustomerInput, CustomerTagUncheckedCreateWithoutCustomerInput> | CustomerTagCreateWithoutCustomerInput[] | CustomerTagUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerTagCreateOrConnectWithoutCustomerInput | CustomerTagCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerTagUpsertWithWhereUniqueWithoutCustomerInput | CustomerTagUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerTagCreateManyCustomerInputEnvelope
    set?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    disconnect?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    delete?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    connect?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    update?: CustomerTagUpdateWithWhereUniqueWithoutCustomerInput | CustomerTagUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerTagUpdateManyWithWhereWithoutCustomerInput | CustomerTagUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerTagScalarWhereInput | CustomerTagScalarWhereInput[]
  }

  export type ShopCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<ShopCreateWithoutTransactionsInput, ShopUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: ShopCreateOrConnectWithoutTransactionsInput
    connect?: ShopWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<CustomerCreateWithoutTransactionsInput, CustomerUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutTransactionsInput
    connect?: CustomerWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedTransactionsInput = {
    create?: XOR<UserCreateWithoutCreatedTransactionsInput, UserUncheckedCreateWithoutCreatedTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionNoteCreateNestedManyWithoutTransactionInput = {
    create?: XOR<TransactionNoteCreateWithoutTransactionInput, TransactionNoteUncheckedCreateWithoutTransactionInput> | TransactionNoteCreateWithoutTransactionInput[] | TransactionNoteUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: TransactionNoteCreateOrConnectWithoutTransactionInput | TransactionNoteCreateOrConnectWithoutTransactionInput[]
    createMany?: TransactionNoteCreateManyTransactionInputEnvelope
    connect?: TransactionNoteWhereUniqueInput | TransactionNoteWhereUniqueInput[]
  }

  export type TransactionNoteUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<TransactionNoteCreateWithoutTransactionInput, TransactionNoteUncheckedCreateWithoutTransactionInput> | TransactionNoteCreateWithoutTransactionInput[] | TransactionNoteUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: TransactionNoteCreateOrConnectWithoutTransactionInput | TransactionNoteCreateOrConnectWithoutTransactionInput[]
    createMany?: TransactionNoteCreateManyTransactionInputEnvelope
    connect?: TransactionNoteWhereUniqueInput | TransactionNoteWhereUniqueInput[]
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type NullableEnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod | null
  }

  export type ShopUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<ShopCreateWithoutTransactionsInput, ShopUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: ShopCreateOrConnectWithoutTransactionsInput
    upsert?: ShopUpsertWithoutTransactionsInput
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutTransactionsInput, ShopUpdateWithoutTransactionsInput>, ShopUncheckedUpdateWithoutTransactionsInput>
  }

  export type CustomerUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<CustomerCreateWithoutTransactionsInput, CustomerUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutTransactionsInput
    upsert?: CustomerUpsertWithoutTransactionsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutTransactionsInput, CustomerUpdateWithoutTransactionsInput>, CustomerUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateOneWithoutCreatedTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedTransactionsInput, UserUncheckedCreateWithoutCreatedTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTransactionsInput
    upsert?: UserUpsertWithoutCreatedTransactionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedTransactionsInput, UserUpdateWithoutCreatedTransactionsInput>, UserUncheckedUpdateWithoutCreatedTransactionsInput>
  }

  export type TransactionNoteUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<TransactionNoteCreateWithoutTransactionInput, TransactionNoteUncheckedCreateWithoutTransactionInput> | TransactionNoteCreateWithoutTransactionInput[] | TransactionNoteUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: TransactionNoteCreateOrConnectWithoutTransactionInput | TransactionNoteCreateOrConnectWithoutTransactionInput[]
    upsert?: TransactionNoteUpsertWithWhereUniqueWithoutTransactionInput | TransactionNoteUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: TransactionNoteCreateManyTransactionInputEnvelope
    set?: TransactionNoteWhereUniqueInput | TransactionNoteWhereUniqueInput[]
    disconnect?: TransactionNoteWhereUniqueInput | TransactionNoteWhereUniqueInput[]
    delete?: TransactionNoteWhereUniqueInput | TransactionNoteWhereUniqueInput[]
    connect?: TransactionNoteWhereUniqueInput | TransactionNoteWhereUniqueInput[]
    update?: TransactionNoteUpdateWithWhereUniqueWithoutTransactionInput | TransactionNoteUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: TransactionNoteUpdateManyWithWhereWithoutTransactionInput | TransactionNoteUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: TransactionNoteScalarWhereInput | TransactionNoteScalarWhereInput[]
  }

  export type TransactionNoteUncheckedUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<TransactionNoteCreateWithoutTransactionInput, TransactionNoteUncheckedCreateWithoutTransactionInput> | TransactionNoteCreateWithoutTransactionInput[] | TransactionNoteUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: TransactionNoteCreateOrConnectWithoutTransactionInput | TransactionNoteCreateOrConnectWithoutTransactionInput[]
    upsert?: TransactionNoteUpsertWithWhereUniqueWithoutTransactionInput | TransactionNoteUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: TransactionNoteCreateManyTransactionInputEnvelope
    set?: TransactionNoteWhereUniqueInput | TransactionNoteWhereUniqueInput[]
    disconnect?: TransactionNoteWhereUniqueInput | TransactionNoteWhereUniqueInput[]
    delete?: TransactionNoteWhereUniqueInput | TransactionNoteWhereUniqueInput[]
    connect?: TransactionNoteWhereUniqueInput | TransactionNoteWhereUniqueInput[]
    update?: TransactionNoteUpdateWithWhereUniqueWithoutTransactionInput | TransactionNoteUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: TransactionNoteUpdateManyWithWhereWithoutTransactionInput | TransactionNoteUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: TransactionNoteScalarWhereInput | TransactionNoteScalarWhereInput[]
  }

  export type ShopCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<ShopCreateWithoutSubscriptionsInput, ShopUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: ShopCreateOrConnectWithoutSubscriptionsInput
    connect?: ShopWhereUniqueInput
  }

  export type EnumSubscriptionPlanFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionPlan
  }

  export type EnumSubscriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ShopUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<ShopCreateWithoutSubscriptionsInput, ShopUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: ShopCreateOrConnectWithoutSubscriptionsInput
    upsert?: ShopUpsertWithoutSubscriptionsInput
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutSubscriptionsInput, ShopUpdateWithoutSubscriptionsInput>, ShopUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type ShopCreateNestedOneWithoutRemindersInput = {
    create?: XOR<ShopCreateWithoutRemindersInput, ShopUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: ShopCreateOrConnectWithoutRemindersInput
    connect?: ShopWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutRemindersInput = {
    create?: XOR<CustomerCreateWithoutRemindersInput, CustomerUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutRemindersInput
    connect?: CustomerWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedRemindersInput = {
    create?: XOR<UserCreateWithoutCreatedRemindersInput, UserUncheckedCreateWithoutCreatedRemindersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedRemindersInput
    connect?: UserWhereUniqueInput
  }

  export type EnumReminderChannelFieldUpdateOperationsInput = {
    set?: $Enums.ReminderChannel
  }

  export type EnumReminderStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReminderStatus
  }

  export type ShopUpdateOneRequiredWithoutRemindersNestedInput = {
    create?: XOR<ShopCreateWithoutRemindersInput, ShopUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: ShopCreateOrConnectWithoutRemindersInput
    upsert?: ShopUpsertWithoutRemindersInput
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutRemindersInput, ShopUpdateWithoutRemindersInput>, ShopUncheckedUpdateWithoutRemindersInput>
  }

  export type CustomerUpdateOneRequiredWithoutRemindersNestedInput = {
    create?: XOR<CustomerCreateWithoutRemindersInput, CustomerUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutRemindersInput
    upsert?: CustomerUpsertWithoutRemindersInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutRemindersInput, CustomerUpdateWithoutRemindersInput>, CustomerUncheckedUpdateWithoutRemindersInput>
  }

  export type UserUpdateOneWithoutCreatedRemindersNestedInput = {
    create?: XOR<UserCreateWithoutCreatedRemindersInput, UserUncheckedCreateWithoutCreatedRemindersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedRemindersInput
    upsert?: UserUpsertWithoutCreatedRemindersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedRemindersInput, UserUpdateWithoutCreatedRemindersInput>, UserUncheckedUpdateWithoutCreatedRemindersInput>
  }

  export type CustomerTagCreateNestedManyWithoutTagInput = {
    create?: XOR<CustomerTagCreateWithoutTagInput, CustomerTagUncheckedCreateWithoutTagInput> | CustomerTagCreateWithoutTagInput[] | CustomerTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: CustomerTagCreateOrConnectWithoutTagInput | CustomerTagCreateOrConnectWithoutTagInput[]
    createMany?: CustomerTagCreateManyTagInputEnvelope
    connect?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
  }

  export type CustomerTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<CustomerTagCreateWithoutTagInput, CustomerTagUncheckedCreateWithoutTagInput> | CustomerTagCreateWithoutTagInput[] | CustomerTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: CustomerTagCreateOrConnectWithoutTagInput | CustomerTagCreateOrConnectWithoutTagInput[]
    createMany?: CustomerTagCreateManyTagInputEnvelope
    connect?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
  }

  export type CustomerTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<CustomerTagCreateWithoutTagInput, CustomerTagUncheckedCreateWithoutTagInput> | CustomerTagCreateWithoutTagInput[] | CustomerTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: CustomerTagCreateOrConnectWithoutTagInput | CustomerTagCreateOrConnectWithoutTagInput[]
    upsert?: CustomerTagUpsertWithWhereUniqueWithoutTagInput | CustomerTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: CustomerTagCreateManyTagInputEnvelope
    set?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    disconnect?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    delete?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    connect?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    update?: CustomerTagUpdateWithWhereUniqueWithoutTagInput | CustomerTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: CustomerTagUpdateManyWithWhereWithoutTagInput | CustomerTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: CustomerTagScalarWhereInput | CustomerTagScalarWhereInput[]
  }

  export type CustomerTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<CustomerTagCreateWithoutTagInput, CustomerTagUncheckedCreateWithoutTagInput> | CustomerTagCreateWithoutTagInput[] | CustomerTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: CustomerTagCreateOrConnectWithoutTagInput | CustomerTagCreateOrConnectWithoutTagInput[]
    upsert?: CustomerTagUpsertWithWhereUniqueWithoutTagInput | CustomerTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: CustomerTagCreateManyTagInputEnvelope
    set?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    disconnect?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    delete?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    connect?: CustomerTagWhereUniqueInput | CustomerTagWhereUniqueInput[]
    update?: CustomerTagUpdateWithWhereUniqueWithoutTagInput | CustomerTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: CustomerTagUpdateManyWithWhereWithoutTagInput | CustomerTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: CustomerTagScalarWhereInput | CustomerTagScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutTagsInput = {
    create?: XOR<CustomerCreateWithoutTagsInput, CustomerUncheckedCreateWithoutTagsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutTagsInput
    connect?: CustomerWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutCustomersInput = {
    create?: XOR<TagCreateWithoutCustomersInput, TagUncheckedCreateWithoutCustomersInput>
    connectOrCreate?: TagCreateOrConnectWithoutCustomersInput
    connect?: TagWhereUniqueInput
  }

  export type CustomerUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<CustomerCreateWithoutTagsInput, CustomerUncheckedCreateWithoutTagsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutTagsInput
    upsert?: CustomerUpsertWithoutTagsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutTagsInput, CustomerUpdateWithoutTagsInput>, CustomerUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutCustomersNestedInput = {
    create?: XOR<TagCreateWithoutCustomersInput, TagUncheckedCreateWithoutCustomersInput>
    connectOrCreate?: TagCreateOrConnectWithoutCustomersInput
    upsert?: TagUpsertWithoutCustomersInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutCustomersInput, TagUpdateWithoutCustomersInput>, TagUncheckedUpdateWithoutCustomersInput>
  }

  export type TransactionCreateNestedOneWithoutNotesInput = {
    create?: XOR<TransactionCreateWithoutNotesInput, TransactionUncheckedCreateWithoutNotesInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutNotesInput
    connect?: TransactionWhereUniqueInput
  }

  export type TransactionUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<TransactionCreateWithoutNotesInput, TransactionUncheckedCreateWithoutNotesInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutNotesInput
    upsert?: TransactionUpsertWithoutNotesInput
    connect?: TransactionWhereUniqueInput
    update?: XOR<XOR<TransactionUpdateToOneWithWhereWithoutNotesInput, TransactionUpdateWithoutNotesInput>, TransactionUncheckedUpdateWithoutNotesInput>
  }

  export type ShopCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<ShopCreateWithoutNotificationsInput, ShopUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ShopCreateOrConnectWithoutNotificationsInput
    connect?: ShopWhereUniqueInput
  }

  export type ShopUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<ShopCreateWithoutNotificationsInput, ShopUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ShopCreateOrConnectWithoutNotificationsInput
    upsert?: ShopUpsertWithoutNotificationsInput
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutNotificationsInput, ShopUpdateWithoutNotificationsInput>, ShopUncheckedUpdateWithoutNotificationsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedEnumPaymentMethodNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPaymentMethodNullableFilter<$PrismaModel> | $Enums.PaymentMethod | null
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPaymentMethodNullableWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodNullableFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodNullableFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionPlan | EnumSubscriptionPlanFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionPlanFilter<$PrismaModel> | $Enums.SubscriptionPlan
  }

  export type NestedEnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type NestedEnumSubscriptionPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionPlan | EnumSubscriptionPlanFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionPlan[] | ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionPlanWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionPlan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionPlanFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionPlanFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumReminderChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderChannel | EnumReminderChannelFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderChannel[] | ListEnumReminderChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderChannel[] | ListEnumReminderChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderChannelFilter<$PrismaModel> | $Enums.ReminderChannel
  }

  export type NestedEnumReminderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | EnumReminderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderStatusFilter<$PrismaModel> | $Enums.ReminderStatus
  }

  export type NestedEnumReminderChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderChannel | EnumReminderChannelFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderChannel[] | ListEnumReminderChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderChannel[] | ListEnumReminderChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderChannelWithAggregatesFilter<$PrismaModel> | $Enums.ReminderChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReminderChannelFilter<$PrismaModel>
    _max?: NestedEnumReminderChannelFilter<$PrismaModel>
  }

  export type NestedEnumReminderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | EnumReminderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReminderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReminderStatusFilter<$PrismaModel>
    _max?: NestedEnumReminderStatusFilter<$PrismaModel>
  }

  export type UserCreateWithoutShopInput = {
    id?: string
    authId: string
    name: string
    phone: string
    email?: string | null
    passwordHash?: string | null
    role?: string
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode?: string | null
    inviteCodeExpiresAt?: Date | string | null
    inviteCodeUsed?: boolean
    createdTransactions?: TransactionCreateNestedManyWithoutCreatorInput
    createdReminders?: ReminderCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutShopInput = {
    id?: string
    authId: string
    name: string
    phone: string
    email?: string | null
    passwordHash?: string | null
    role?: string
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode?: string | null
    inviteCodeExpiresAt?: Date | string | null
    inviteCodeUsed?: boolean
    createdTransactions?: TransactionUncheckedCreateNestedManyWithoutCreatorInput
    createdReminders?: ReminderUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutShopInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutShopInput, UserUncheckedCreateWithoutShopInput>
  }

  export type UserCreateManyShopInputEnvelope = {
    data: UserCreateManyShopInput | UserCreateManyShopInput[]
    skipDuplicates?: boolean
  }

  export type CustomerCreateWithoutShopInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    notes?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    creditLimit?: Decimal | DecimalJsLike | number | string
    qrToken?: string | null
    qrTokenExpiresAt?: Date | string | null
    reminderInterval?: string
    lastReminderAt?: Date | string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutCustomerInput
    reminders?: ReminderCreateNestedManyWithoutCustomerInput
    tags?: CustomerTagCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutShopInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    notes?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    creditLimit?: Decimal | DecimalJsLike | number | string
    qrToken?: string | null
    qrTokenExpiresAt?: Date | string | null
    reminderInterval?: string
    lastReminderAt?: Date | string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutCustomerInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutCustomerInput
    tags?: CustomerTagUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutShopInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutShopInput, CustomerUncheckedCreateWithoutShopInput>
  }

  export type CustomerCreateManyShopInputEnvelope = {
    data: CustomerCreateManyShopInput | CustomerCreateManyShopInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutShopInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    description?: string | null
    referenceNumber?: string | null
    paymentMethod?: $Enums.PaymentMethod | null
    transactionDate?: Date | string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    customer: CustomerCreateNestedOneWithoutTransactionsInput
    creator?: UserCreateNestedOneWithoutCreatedTransactionsInput
    notes?: TransactionNoteCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutShopInput = {
    id?: string
    customerId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    description?: string | null
    referenceNumber?: string | null
    paymentMethod?: $Enums.PaymentMethod | null
    transactionDate?: Date | string
    createdBy?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    notes?: TransactionNoteUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionCreateOrConnectWithoutShopInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutShopInput, TransactionUncheckedCreateWithoutShopInput>
  }

  export type TransactionCreateManyShopInputEnvelope = {
    data: TransactionCreateManyShopInput | TransactionCreateManyShopInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionCreateWithoutShopInput = {
    id?: string
    plan?: $Enums.SubscriptionPlan
    status?: $Enums.SubscriptionStatus
    maxCustomers?: number
    maxUsers?: number
    amount?: Decimal | DecimalJsLike | number | string
    currency?: string
    billingCycle?: string
    startsAt?: Date | string
    expiresAt?: Date | string | null
    cancelledAt?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUncheckedCreateWithoutShopInput = {
    id?: string
    plan?: $Enums.SubscriptionPlan
    status?: $Enums.SubscriptionStatus
    maxCustomers?: number
    maxUsers?: number
    amount?: Decimal | DecimalJsLike | number | string
    currency?: string
    billingCycle?: string
    startsAt?: Date | string
    expiresAt?: Date | string | null
    cancelledAt?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutShopInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutShopInput, SubscriptionUncheckedCreateWithoutShopInput>
  }

  export type SubscriptionCreateManyShopInputEnvelope = {
    data: SubscriptionCreateManyShopInput | SubscriptionCreateManyShopInput[]
    skipDuplicates?: boolean
  }

  export type ReminderCreateWithoutShopInput = {
    id?: string
    channel?: $Enums.ReminderChannel
    status?: $Enums.ReminderStatus
    message: string
    amountDue: Decimal | DecimalJsLike | number | string
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    failedReason?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutRemindersInput
    creator?: UserCreateNestedOneWithoutCreatedRemindersInput
  }

  export type ReminderUncheckedCreateWithoutShopInput = {
    id?: string
    customerId: string
    channel?: $Enums.ReminderChannel
    status?: $Enums.ReminderStatus
    message: string
    amountDue: Decimal | DecimalJsLike | number | string
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    failedReason?: string | null
    createdBy?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReminderCreateOrConnectWithoutShopInput = {
    where: ReminderWhereUniqueInput
    create: XOR<ReminderCreateWithoutShopInput, ReminderUncheckedCreateWithoutShopInput>
  }

  export type ReminderCreateManyShopInputEnvelope = {
    data: ReminderCreateManyShopInput | ReminderCreateManyShopInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutShopInput = {
    id?: string
    userId: string
    title: string
    message: string
    type: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutShopInput = {
    id?: string
    userId: string
    title: string
    message: string
    type: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutShopInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutShopInput, NotificationUncheckedCreateWithoutShopInput>
  }

  export type NotificationCreateManyShopInputEnvelope = {
    data: NotificationCreateManyShopInput | NotificationCreateManyShopInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutShopInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutShopInput, UserUncheckedUpdateWithoutShopInput>
    create: XOR<UserCreateWithoutShopInput, UserUncheckedCreateWithoutShopInput>
  }

  export type UserUpdateWithWhereUniqueWithoutShopInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutShopInput, UserUncheckedUpdateWithoutShopInput>
  }

  export type UserUpdateManyWithWhereWithoutShopInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutShopInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: UuidFilter<"User"> | string
    shopId?: UuidNullableFilter<"User"> | string | null
    authId?: UuidFilter<"User"> | string
    name?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    inviteCode?: StringNullableFilter<"User"> | string | null
    inviteCodeExpiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    inviteCodeUsed?: BoolFilter<"User"> | boolean
  }

  export type CustomerUpsertWithWhereUniqueWithoutShopInput = {
    where: CustomerWhereUniqueInput
    update: XOR<CustomerUpdateWithoutShopInput, CustomerUncheckedUpdateWithoutShopInput>
    create: XOR<CustomerCreateWithoutShopInput, CustomerUncheckedCreateWithoutShopInput>
  }

  export type CustomerUpdateWithWhereUniqueWithoutShopInput = {
    where: CustomerWhereUniqueInput
    data: XOR<CustomerUpdateWithoutShopInput, CustomerUncheckedUpdateWithoutShopInput>
  }

  export type CustomerUpdateManyWithWhereWithoutShopInput = {
    where: CustomerScalarWhereInput
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyWithoutShopInput>
  }

  export type CustomerScalarWhereInput = {
    AND?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
    OR?: CustomerScalarWhereInput[]
    NOT?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
    id?: UuidFilter<"Customer"> | string
    shopId?: UuidFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    phone?: StringFilter<"Customer"> | string
    email?: StringNullableFilter<"Customer"> | string | null
    address?: StringNullableFilter<"Customer"> | string | null
    notes?: StringNullableFilter<"Customer"> | string | null
    balance?: DecimalFilter<"Customer"> | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFilter<"Customer"> | Decimal | DecimalJsLike | number | string
    qrToken?: StringNullableFilter<"Customer"> | string | null
    qrTokenExpiresAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    reminderInterval?: StringFilter<"Customer"> | string
    lastReminderAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    isActive?: BoolFilter<"Customer"> | boolean
    deletedAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
  }

  export type TransactionUpsertWithWhereUniqueWithoutShopInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutShopInput, TransactionUncheckedUpdateWithoutShopInput>
    create: XOR<TransactionCreateWithoutShopInput, TransactionUncheckedCreateWithoutShopInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutShopInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutShopInput, TransactionUncheckedUpdateWithoutShopInput>
  }

  export type TransactionUpdateManyWithWhereWithoutShopInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutShopInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: UuidFilter<"Transaction"> | string
    shopId?: UuidFilter<"Transaction"> | string
    customerId?: UuidFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"Transaction"> | string | null
    referenceNumber?: StringNullableFilter<"Transaction"> | string | null
    paymentMethod?: EnumPaymentMethodNullableFilter<"Transaction"> | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFilter<"Transaction"> | Date | string
    createdBy?: UuidNullableFilter<"Transaction"> | string | null
    deletedAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutShopInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutShopInput, SubscriptionUncheckedUpdateWithoutShopInput>
    create: XOR<SubscriptionCreateWithoutShopInput, SubscriptionUncheckedCreateWithoutShopInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutShopInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutShopInput, SubscriptionUncheckedUpdateWithoutShopInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutShopInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutShopInput>
  }

  export type SubscriptionScalarWhereInput = {
    AND?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    OR?: SubscriptionScalarWhereInput[]
    NOT?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    id?: UuidFilter<"Subscription"> | string
    shopId?: UuidFilter<"Subscription"> | string
    plan?: EnumSubscriptionPlanFilter<"Subscription"> | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    maxCustomers?: IntFilter<"Subscription"> | number
    maxUsers?: IntFilter<"Subscription"> | number
    amount?: DecimalFilter<"Subscription"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Subscription"> | string
    billingCycle?: StringFilter<"Subscription"> | string
    startsAt?: DateTimeFilter<"Subscription"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
  }

  export type ReminderUpsertWithWhereUniqueWithoutShopInput = {
    where: ReminderWhereUniqueInput
    update: XOR<ReminderUpdateWithoutShopInput, ReminderUncheckedUpdateWithoutShopInput>
    create: XOR<ReminderCreateWithoutShopInput, ReminderUncheckedCreateWithoutShopInput>
  }

  export type ReminderUpdateWithWhereUniqueWithoutShopInput = {
    where: ReminderWhereUniqueInput
    data: XOR<ReminderUpdateWithoutShopInput, ReminderUncheckedUpdateWithoutShopInput>
  }

  export type ReminderUpdateManyWithWhereWithoutShopInput = {
    where: ReminderScalarWhereInput
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyWithoutShopInput>
  }

  export type ReminderScalarWhereInput = {
    AND?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
    OR?: ReminderScalarWhereInput[]
    NOT?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
    id?: UuidFilter<"Reminder"> | string
    shopId?: UuidFilter<"Reminder"> | string
    customerId?: UuidFilter<"Reminder"> | string
    channel?: EnumReminderChannelFilter<"Reminder"> | $Enums.ReminderChannel
    status?: EnumReminderStatusFilter<"Reminder"> | $Enums.ReminderStatus
    message?: StringFilter<"Reminder"> | string
    amountDue?: DecimalFilter<"Reminder"> | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFilter<"Reminder"> | Date | string
    sentAt?: DateTimeNullableFilter<"Reminder"> | Date | string | null
    failedReason?: StringNullableFilter<"Reminder"> | string | null
    createdBy?: UuidNullableFilter<"Reminder"> | string | null
    deletedAt?: DateTimeNullableFilter<"Reminder"> | Date | string | null
    createdAt?: DateTimeFilter<"Reminder"> | Date | string
    updatedAt?: DateTimeFilter<"Reminder"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutShopInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutShopInput, NotificationUncheckedUpdateWithoutShopInput>
    create: XOR<NotificationCreateWithoutShopInput, NotificationUncheckedCreateWithoutShopInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutShopInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutShopInput, NotificationUncheckedUpdateWithoutShopInput>
  }

  export type NotificationUpdateManyWithWhereWithoutShopInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutShopInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: UuidFilter<"Notification"> | string
    shopId?: UuidFilter<"Notification"> | string
    userId?: UuidFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type ShopCreateWithoutUsersInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    pincode?: string | null
    logoUrl?: string | null
    currency?: string
    upiId?: string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerCreateNestedManyWithoutShopInput
    transactions?: TransactionCreateNestedManyWithoutShopInput
    subscriptions?: SubscriptionCreateNestedManyWithoutShopInput
    reminders?: ReminderCreateNestedManyWithoutShopInput
    notifications?: NotificationCreateNestedManyWithoutShopInput
  }

  export type ShopUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    pincode?: string | null
    logoUrl?: string | null
    currency?: string
    upiId?: string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerUncheckedCreateNestedManyWithoutShopInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutShopInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutShopInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutShopInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutShopInput
  }

  export type ShopCreateOrConnectWithoutUsersInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutUsersInput, ShopUncheckedCreateWithoutUsersInput>
  }

  export type TransactionCreateWithoutCreatorInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    description?: string | null
    referenceNumber?: string | null
    paymentMethod?: $Enums.PaymentMethod | null
    transactionDate?: Date | string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    shop: ShopCreateNestedOneWithoutTransactionsInput
    customer: CustomerCreateNestedOneWithoutTransactionsInput
    notes?: TransactionNoteCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutCreatorInput = {
    id?: string
    shopId: string
    customerId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    description?: string | null
    referenceNumber?: string | null
    paymentMethod?: $Enums.PaymentMethod | null
    transactionDate?: Date | string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    notes?: TransactionNoteUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionCreateOrConnectWithoutCreatorInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutCreatorInput, TransactionUncheckedCreateWithoutCreatorInput>
  }

  export type TransactionCreateManyCreatorInputEnvelope = {
    data: TransactionCreateManyCreatorInput | TransactionCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type ReminderCreateWithoutCreatorInput = {
    id?: string
    channel?: $Enums.ReminderChannel
    status?: $Enums.ReminderStatus
    message: string
    amountDue: Decimal | DecimalJsLike | number | string
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    failedReason?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutRemindersInput
    customer: CustomerCreateNestedOneWithoutRemindersInput
  }

  export type ReminderUncheckedCreateWithoutCreatorInput = {
    id?: string
    shopId: string
    customerId: string
    channel?: $Enums.ReminderChannel
    status?: $Enums.ReminderStatus
    message: string
    amountDue: Decimal | DecimalJsLike | number | string
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    failedReason?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReminderCreateOrConnectWithoutCreatorInput = {
    where: ReminderWhereUniqueInput
    create: XOR<ReminderCreateWithoutCreatorInput, ReminderUncheckedCreateWithoutCreatorInput>
  }

  export type ReminderCreateManyCreatorInputEnvelope = {
    data: ReminderCreateManyCreatorInput | ReminderCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type ShopUpsertWithoutUsersInput = {
    update: XOR<ShopUpdateWithoutUsersInput, ShopUncheckedUpdateWithoutUsersInput>
    create: XOR<ShopCreateWithoutUsersInput, ShopUncheckedCreateWithoutUsersInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutUsersInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutUsersInput, ShopUncheckedUpdateWithoutUsersInput>
  }

  export type ShopUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUpdateManyWithoutShopNestedInput
    transactions?: TransactionUpdateManyWithoutShopNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutShopNestedInput
    reminders?: ReminderUpdateManyWithoutShopNestedInput
    notifications?: NotificationUpdateManyWithoutShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUncheckedUpdateManyWithoutShopNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutShopNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutShopNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutShopNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutShopNestedInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutCreatorInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutCreatorInput, TransactionUncheckedUpdateWithoutCreatorInput>
    create: XOR<TransactionCreateWithoutCreatorInput, TransactionUncheckedCreateWithoutCreatorInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutCreatorInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutCreatorInput, TransactionUncheckedUpdateWithoutCreatorInput>
  }

  export type TransactionUpdateManyWithWhereWithoutCreatorInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutCreatorInput>
  }

  export type ReminderUpsertWithWhereUniqueWithoutCreatorInput = {
    where: ReminderWhereUniqueInput
    update: XOR<ReminderUpdateWithoutCreatorInput, ReminderUncheckedUpdateWithoutCreatorInput>
    create: XOR<ReminderCreateWithoutCreatorInput, ReminderUncheckedCreateWithoutCreatorInput>
  }

  export type ReminderUpdateWithWhereUniqueWithoutCreatorInput = {
    where: ReminderWhereUniqueInput
    data: XOR<ReminderUpdateWithoutCreatorInput, ReminderUncheckedUpdateWithoutCreatorInput>
  }

  export type ReminderUpdateManyWithWhereWithoutCreatorInput = {
    where: ReminderScalarWhereInput
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyWithoutCreatorInput>
  }

  export type ShopCreateWithoutCustomersInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    pincode?: string | null
    logoUrl?: string | null
    currency?: string
    upiId?: string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutShopInput
    transactions?: TransactionCreateNestedManyWithoutShopInput
    subscriptions?: SubscriptionCreateNestedManyWithoutShopInput
    reminders?: ReminderCreateNestedManyWithoutShopInput
    notifications?: NotificationCreateNestedManyWithoutShopInput
  }

  export type ShopUncheckedCreateWithoutCustomersInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    pincode?: string | null
    logoUrl?: string | null
    currency?: string
    upiId?: string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutShopInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutShopInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutShopInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutShopInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutShopInput
  }

  export type ShopCreateOrConnectWithoutCustomersInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutCustomersInput, ShopUncheckedCreateWithoutCustomersInput>
  }

  export type TransactionCreateWithoutCustomerInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    description?: string | null
    referenceNumber?: string | null
    paymentMethod?: $Enums.PaymentMethod | null
    transactionDate?: Date | string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    shop: ShopCreateNestedOneWithoutTransactionsInput
    creator?: UserCreateNestedOneWithoutCreatedTransactionsInput
    notes?: TransactionNoteCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutCustomerInput = {
    id?: string
    shopId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    description?: string | null
    referenceNumber?: string | null
    paymentMethod?: $Enums.PaymentMethod | null
    transactionDate?: Date | string
    createdBy?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    notes?: TransactionNoteUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionCreateOrConnectWithoutCustomerInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutCustomerInput, TransactionUncheckedCreateWithoutCustomerInput>
  }

  export type TransactionCreateManyCustomerInputEnvelope = {
    data: TransactionCreateManyCustomerInput | TransactionCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type ReminderCreateWithoutCustomerInput = {
    id?: string
    channel?: $Enums.ReminderChannel
    status?: $Enums.ReminderStatus
    message: string
    amountDue: Decimal | DecimalJsLike | number | string
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    failedReason?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutRemindersInput
    creator?: UserCreateNestedOneWithoutCreatedRemindersInput
  }

  export type ReminderUncheckedCreateWithoutCustomerInput = {
    id?: string
    shopId: string
    channel?: $Enums.ReminderChannel
    status?: $Enums.ReminderStatus
    message: string
    amountDue: Decimal | DecimalJsLike | number | string
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    failedReason?: string | null
    createdBy?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReminderCreateOrConnectWithoutCustomerInput = {
    where: ReminderWhereUniqueInput
    create: XOR<ReminderCreateWithoutCustomerInput, ReminderUncheckedCreateWithoutCustomerInput>
  }

  export type ReminderCreateManyCustomerInputEnvelope = {
    data: ReminderCreateManyCustomerInput | ReminderCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type CustomerTagCreateWithoutCustomerInput = {
    id?: string
    createdAt?: Date | string
    tag: TagCreateNestedOneWithoutCustomersInput
  }

  export type CustomerTagUncheckedCreateWithoutCustomerInput = {
    id?: string
    tagId: string
    createdAt?: Date | string
  }

  export type CustomerTagCreateOrConnectWithoutCustomerInput = {
    where: CustomerTagWhereUniqueInput
    create: XOR<CustomerTagCreateWithoutCustomerInput, CustomerTagUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerTagCreateManyCustomerInputEnvelope = {
    data: CustomerTagCreateManyCustomerInput | CustomerTagCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type ShopUpsertWithoutCustomersInput = {
    update: XOR<ShopUpdateWithoutCustomersInput, ShopUncheckedUpdateWithoutCustomersInput>
    create: XOR<ShopCreateWithoutCustomersInput, ShopUncheckedCreateWithoutCustomersInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutCustomersInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutCustomersInput, ShopUncheckedUpdateWithoutCustomersInput>
  }

  export type ShopUpdateWithoutCustomersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutShopNestedInput
    transactions?: TransactionUpdateManyWithoutShopNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutShopNestedInput
    reminders?: ReminderUpdateManyWithoutShopNestedInput
    notifications?: NotificationUpdateManyWithoutShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutCustomersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutShopNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutShopNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutShopNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutShopNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutShopNestedInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutCustomerInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutCustomerInput, TransactionUncheckedUpdateWithoutCustomerInput>
    create: XOR<TransactionCreateWithoutCustomerInput, TransactionUncheckedCreateWithoutCustomerInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutCustomerInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutCustomerInput, TransactionUncheckedUpdateWithoutCustomerInput>
  }

  export type TransactionUpdateManyWithWhereWithoutCustomerInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutCustomerInput>
  }

  export type ReminderUpsertWithWhereUniqueWithoutCustomerInput = {
    where: ReminderWhereUniqueInput
    update: XOR<ReminderUpdateWithoutCustomerInput, ReminderUncheckedUpdateWithoutCustomerInput>
    create: XOR<ReminderCreateWithoutCustomerInput, ReminderUncheckedCreateWithoutCustomerInput>
  }

  export type ReminderUpdateWithWhereUniqueWithoutCustomerInput = {
    where: ReminderWhereUniqueInput
    data: XOR<ReminderUpdateWithoutCustomerInput, ReminderUncheckedUpdateWithoutCustomerInput>
  }

  export type ReminderUpdateManyWithWhereWithoutCustomerInput = {
    where: ReminderScalarWhereInput
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CustomerTagUpsertWithWhereUniqueWithoutCustomerInput = {
    where: CustomerTagWhereUniqueInput
    update: XOR<CustomerTagUpdateWithoutCustomerInput, CustomerTagUncheckedUpdateWithoutCustomerInput>
    create: XOR<CustomerTagCreateWithoutCustomerInput, CustomerTagUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerTagUpdateWithWhereUniqueWithoutCustomerInput = {
    where: CustomerTagWhereUniqueInput
    data: XOR<CustomerTagUpdateWithoutCustomerInput, CustomerTagUncheckedUpdateWithoutCustomerInput>
  }

  export type CustomerTagUpdateManyWithWhereWithoutCustomerInput = {
    where: CustomerTagScalarWhereInput
    data: XOR<CustomerTagUpdateManyMutationInput, CustomerTagUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CustomerTagScalarWhereInput = {
    AND?: CustomerTagScalarWhereInput | CustomerTagScalarWhereInput[]
    OR?: CustomerTagScalarWhereInput[]
    NOT?: CustomerTagScalarWhereInput | CustomerTagScalarWhereInput[]
    id?: UuidFilter<"CustomerTag"> | string
    customerId?: UuidFilter<"CustomerTag"> | string
    tagId?: UuidFilter<"CustomerTag"> | string
    createdAt?: DateTimeFilter<"CustomerTag"> | Date | string
  }

  export type ShopCreateWithoutTransactionsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    pincode?: string | null
    logoUrl?: string | null
    currency?: string
    upiId?: string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutShopInput
    customers?: CustomerCreateNestedManyWithoutShopInput
    subscriptions?: SubscriptionCreateNestedManyWithoutShopInput
    reminders?: ReminderCreateNestedManyWithoutShopInput
    notifications?: NotificationCreateNestedManyWithoutShopInput
  }

  export type ShopUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    pincode?: string | null
    logoUrl?: string | null
    currency?: string
    upiId?: string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutShopInput
    customers?: CustomerUncheckedCreateNestedManyWithoutShopInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutShopInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutShopInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutShopInput
  }

  export type ShopCreateOrConnectWithoutTransactionsInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutTransactionsInput, ShopUncheckedCreateWithoutTransactionsInput>
  }

  export type CustomerCreateWithoutTransactionsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    notes?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    creditLimit?: Decimal | DecimalJsLike | number | string
    qrToken?: string | null
    qrTokenExpiresAt?: Date | string | null
    reminderInterval?: string
    lastReminderAt?: Date | string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutCustomersInput
    reminders?: ReminderCreateNestedManyWithoutCustomerInput
    tags?: CustomerTagCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutTransactionsInput = {
    id?: string
    shopId: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    notes?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    creditLimit?: Decimal | DecimalJsLike | number | string
    qrToken?: string | null
    qrTokenExpiresAt?: Date | string | null
    reminderInterval?: string
    lastReminderAt?: Date | string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reminders?: ReminderUncheckedCreateNestedManyWithoutCustomerInput
    tags?: CustomerTagUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutTransactionsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutTransactionsInput, CustomerUncheckedCreateWithoutTransactionsInput>
  }

  export type UserCreateWithoutCreatedTransactionsInput = {
    id?: string
    authId: string
    name: string
    phone: string
    email?: string | null
    passwordHash?: string | null
    role?: string
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode?: string | null
    inviteCodeExpiresAt?: Date | string | null
    inviteCodeUsed?: boolean
    shop?: ShopCreateNestedOneWithoutUsersInput
    createdReminders?: ReminderCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutCreatedTransactionsInput = {
    id?: string
    shopId?: string | null
    authId: string
    name: string
    phone: string
    email?: string | null
    passwordHash?: string | null
    role?: string
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode?: string | null
    inviteCodeExpiresAt?: Date | string | null
    inviteCodeUsed?: boolean
    createdReminders?: ReminderUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutCreatedTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedTransactionsInput, UserUncheckedCreateWithoutCreatedTransactionsInput>
  }

  export type TransactionNoteCreateWithoutTransactionInput = {
    id?: string
    shopId: string
    userId?: string | null
    content: string
    isDispute?: boolean
    createdAt?: Date | string
  }

  export type TransactionNoteUncheckedCreateWithoutTransactionInput = {
    id?: string
    shopId: string
    userId?: string | null
    content: string
    isDispute?: boolean
    createdAt?: Date | string
  }

  export type TransactionNoteCreateOrConnectWithoutTransactionInput = {
    where: TransactionNoteWhereUniqueInput
    create: XOR<TransactionNoteCreateWithoutTransactionInput, TransactionNoteUncheckedCreateWithoutTransactionInput>
  }

  export type TransactionNoteCreateManyTransactionInputEnvelope = {
    data: TransactionNoteCreateManyTransactionInput | TransactionNoteCreateManyTransactionInput[]
    skipDuplicates?: boolean
  }

  export type ShopUpsertWithoutTransactionsInput = {
    update: XOR<ShopUpdateWithoutTransactionsInput, ShopUncheckedUpdateWithoutTransactionsInput>
    create: XOR<ShopCreateWithoutTransactionsInput, ShopUncheckedCreateWithoutTransactionsInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutTransactionsInput, ShopUncheckedUpdateWithoutTransactionsInput>
  }

  export type ShopUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutShopNestedInput
    customers?: CustomerUpdateManyWithoutShopNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutShopNestedInput
    reminders?: ReminderUpdateManyWithoutShopNestedInput
    notifications?: NotificationUpdateManyWithoutShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutShopNestedInput
    customers?: CustomerUncheckedUpdateManyWithoutShopNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutShopNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutShopNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutShopNestedInput
  }

  export type CustomerUpsertWithoutTransactionsInput = {
    update: XOR<CustomerUpdateWithoutTransactionsInput, CustomerUncheckedUpdateWithoutTransactionsInput>
    create: XOR<CustomerCreateWithoutTransactionsInput, CustomerUncheckedCreateWithoutTransactionsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutTransactionsInput, CustomerUncheckedUpdateWithoutTransactionsInput>
  }

  export type CustomerUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reminderInterval?: StringFieldUpdateOperationsInput | string
    lastReminderAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutCustomersNestedInput
    reminders?: ReminderUpdateManyWithoutCustomerNestedInput
    tags?: CustomerTagUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reminderInterval?: StringFieldUpdateOperationsInput | string
    lastReminderAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reminders?: ReminderUncheckedUpdateManyWithoutCustomerNestedInput
    tags?: CustomerTagUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type UserUpsertWithoutCreatedTransactionsInput = {
    update: XOR<UserUpdateWithoutCreatedTransactionsInput, UserUncheckedUpdateWithoutCreatedTransactionsInput>
    create: XOR<UserCreateWithoutCreatedTransactionsInput, UserUncheckedCreateWithoutCreatedTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedTransactionsInput, UserUncheckedUpdateWithoutCreatedTransactionsInput>
  }

  export type UserUpdateWithoutCreatedTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inviteCodeUsed?: BoolFieldUpdateOperationsInput | boolean
    shop?: ShopUpdateOneWithoutUsersNestedInput
    createdReminders?: ReminderUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: NullableStringFieldUpdateOperationsInput | string | null
    authId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inviteCodeUsed?: BoolFieldUpdateOperationsInput | boolean
    createdReminders?: ReminderUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type TransactionNoteUpsertWithWhereUniqueWithoutTransactionInput = {
    where: TransactionNoteWhereUniqueInput
    update: XOR<TransactionNoteUpdateWithoutTransactionInput, TransactionNoteUncheckedUpdateWithoutTransactionInput>
    create: XOR<TransactionNoteCreateWithoutTransactionInput, TransactionNoteUncheckedCreateWithoutTransactionInput>
  }

  export type TransactionNoteUpdateWithWhereUniqueWithoutTransactionInput = {
    where: TransactionNoteWhereUniqueInput
    data: XOR<TransactionNoteUpdateWithoutTransactionInput, TransactionNoteUncheckedUpdateWithoutTransactionInput>
  }

  export type TransactionNoteUpdateManyWithWhereWithoutTransactionInput = {
    where: TransactionNoteScalarWhereInput
    data: XOR<TransactionNoteUpdateManyMutationInput, TransactionNoteUncheckedUpdateManyWithoutTransactionInput>
  }

  export type TransactionNoteScalarWhereInput = {
    AND?: TransactionNoteScalarWhereInput | TransactionNoteScalarWhereInput[]
    OR?: TransactionNoteScalarWhereInput[]
    NOT?: TransactionNoteScalarWhereInput | TransactionNoteScalarWhereInput[]
    id?: UuidFilter<"TransactionNote"> | string
    transactionId?: UuidFilter<"TransactionNote"> | string
    shopId?: UuidFilter<"TransactionNote"> | string
    userId?: UuidNullableFilter<"TransactionNote"> | string | null
    content?: StringFilter<"TransactionNote"> | string
    isDispute?: BoolFilter<"TransactionNote"> | boolean
    createdAt?: DateTimeFilter<"TransactionNote"> | Date | string
  }

  export type ShopCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    pincode?: string | null
    logoUrl?: string | null
    currency?: string
    upiId?: string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutShopInput
    customers?: CustomerCreateNestedManyWithoutShopInput
    transactions?: TransactionCreateNestedManyWithoutShopInput
    reminders?: ReminderCreateNestedManyWithoutShopInput
    notifications?: NotificationCreateNestedManyWithoutShopInput
  }

  export type ShopUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    pincode?: string | null
    logoUrl?: string | null
    currency?: string
    upiId?: string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutShopInput
    customers?: CustomerUncheckedCreateNestedManyWithoutShopInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutShopInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutShopInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutShopInput
  }

  export type ShopCreateOrConnectWithoutSubscriptionsInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutSubscriptionsInput, ShopUncheckedCreateWithoutSubscriptionsInput>
  }

  export type ShopUpsertWithoutSubscriptionsInput = {
    update: XOR<ShopUpdateWithoutSubscriptionsInput, ShopUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<ShopCreateWithoutSubscriptionsInput, ShopUncheckedCreateWithoutSubscriptionsInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutSubscriptionsInput, ShopUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type ShopUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutShopNestedInput
    customers?: CustomerUpdateManyWithoutShopNestedInput
    transactions?: TransactionUpdateManyWithoutShopNestedInput
    reminders?: ReminderUpdateManyWithoutShopNestedInput
    notifications?: NotificationUpdateManyWithoutShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutShopNestedInput
    customers?: CustomerUncheckedUpdateManyWithoutShopNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutShopNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutShopNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutShopNestedInput
  }

  export type ShopCreateWithoutRemindersInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    pincode?: string | null
    logoUrl?: string | null
    currency?: string
    upiId?: string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutShopInput
    customers?: CustomerCreateNestedManyWithoutShopInput
    transactions?: TransactionCreateNestedManyWithoutShopInput
    subscriptions?: SubscriptionCreateNestedManyWithoutShopInput
    notifications?: NotificationCreateNestedManyWithoutShopInput
  }

  export type ShopUncheckedCreateWithoutRemindersInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    pincode?: string | null
    logoUrl?: string | null
    currency?: string
    upiId?: string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutShopInput
    customers?: CustomerUncheckedCreateNestedManyWithoutShopInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutShopInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutShopInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutShopInput
  }

  export type ShopCreateOrConnectWithoutRemindersInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutRemindersInput, ShopUncheckedCreateWithoutRemindersInput>
  }

  export type CustomerCreateWithoutRemindersInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    notes?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    creditLimit?: Decimal | DecimalJsLike | number | string
    qrToken?: string | null
    qrTokenExpiresAt?: Date | string | null
    reminderInterval?: string
    lastReminderAt?: Date | string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutCustomersInput
    transactions?: TransactionCreateNestedManyWithoutCustomerInput
    tags?: CustomerTagCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutRemindersInput = {
    id?: string
    shopId: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    notes?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    creditLimit?: Decimal | DecimalJsLike | number | string
    qrToken?: string | null
    qrTokenExpiresAt?: Date | string | null
    reminderInterval?: string
    lastReminderAt?: Date | string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutCustomerInput
    tags?: CustomerTagUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutRemindersInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutRemindersInput, CustomerUncheckedCreateWithoutRemindersInput>
  }

  export type UserCreateWithoutCreatedRemindersInput = {
    id?: string
    authId: string
    name: string
    phone: string
    email?: string | null
    passwordHash?: string | null
    role?: string
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode?: string | null
    inviteCodeExpiresAt?: Date | string | null
    inviteCodeUsed?: boolean
    shop?: ShopCreateNestedOneWithoutUsersInput
    createdTransactions?: TransactionCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutCreatedRemindersInput = {
    id?: string
    shopId?: string | null
    authId: string
    name: string
    phone: string
    email?: string | null
    passwordHash?: string | null
    role?: string
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode?: string | null
    inviteCodeExpiresAt?: Date | string | null
    inviteCodeUsed?: boolean
    createdTransactions?: TransactionUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutCreatedRemindersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedRemindersInput, UserUncheckedCreateWithoutCreatedRemindersInput>
  }

  export type ShopUpsertWithoutRemindersInput = {
    update: XOR<ShopUpdateWithoutRemindersInput, ShopUncheckedUpdateWithoutRemindersInput>
    create: XOR<ShopCreateWithoutRemindersInput, ShopUncheckedCreateWithoutRemindersInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutRemindersInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutRemindersInput, ShopUncheckedUpdateWithoutRemindersInput>
  }

  export type ShopUpdateWithoutRemindersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutShopNestedInput
    customers?: CustomerUpdateManyWithoutShopNestedInput
    transactions?: TransactionUpdateManyWithoutShopNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutShopNestedInput
    notifications?: NotificationUpdateManyWithoutShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutRemindersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutShopNestedInput
    customers?: CustomerUncheckedUpdateManyWithoutShopNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutShopNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutShopNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutShopNestedInput
  }

  export type CustomerUpsertWithoutRemindersInput = {
    update: XOR<CustomerUpdateWithoutRemindersInput, CustomerUncheckedUpdateWithoutRemindersInput>
    create: XOR<CustomerCreateWithoutRemindersInput, CustomerUncheckedCreateWithoutRemindersInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutRemindersInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutRemindersInput, CustomerUncheckedUpdateWithoutRemindersInput>
  }

  export type CustomerUpdateWithoutRemindersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reminderInterval?: StringFieldUpdateOperationsInput | string
    lastReminderAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutCustomersNestedInput
    transactions?: TransactionUpdateManyWithoutCustomerNestedInput
    tags?: CustomerTagUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutRemindersInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reminderInterval?: StringFieldUpdateOperationsInput | string
    lastReminderAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutCustomerNestedInput
    tags?: CustomerTagUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type UserUpsertWithoutCreatedRemindersInput = {
    update: XOR<UserUpdateWithoutCreatedRemindersInput, UserUncheckedUpdateWithoutCreatedRemindersInput>
    create: XOR<UserCreateWithoutCreatedRemindersInput, UserUncheckedCreateWithoutCreatedRemindersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedRemindersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedRemindersInput, UserUncheckedUpdateWithoutCreatedRemindersInput>
  }

  export type UserUpdateWithoutCreatedRemindersInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inviteCodeUsed?: BoolFieldUpdateOperationsInput | boolean
    shop?: ShopUpdateOneWithoutUsersNestedInput
    createdTransactions?: TransactionUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedRemindersInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: NullableStringFieldUpdateOperationsInput | string | null
    authId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inviteCodeUsed?: BoolFieldUpdateOperationsInput | boolean
    createdTransactions?: TransactionUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type CustomerTagCreateWithoutTagInput = {
    id?: string
    createdAt?: Date | string
    customer: CustomerCreateNestedOneWithoutTagsInput
  }

  export type CustomerTagUncheckedCreateWithoutTagInput = {
    id?: string
    customerId: string
    createdAt?: Date | string
  }

  export type CustomerTagCreateOrConnectWithoutTagInput = {
    where: CustomerTagWhereUniqueInput
    create: XOR<CustomerTagCreateWithoutTagInput, CustomerTagUncheckedCreateWithoutTagInput>
  }

  export type CustomerTagCreateManyTagInputEnvelope = {
    data: CustomerTagCreateManyTagInput | CustomerTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type CustomerTagUpsertWithWhereUniqueWithoutTagInput = {
    where: CustomerTagWhereUniqueInput
    update: XOR<CustomerTagUpdateWithoutTagInput, CustomerTagUncheckedUpdateWithoutTagInput>
    create: XOR<CustomerTagCreateWithoutTagInput, CustomerTagUncheckedCreateWithoutTagInput>
  }

  export type CustomerTagUpdateWithWhereUniqueWithoutTagInput = {
    where: CustomerTagWhereUniqueInput
    data: XOR<CustomerTagUpdateWithoutTagInput, CustomerTagUncheckedUpdateWithoutTagInput>
  }

  export type CustomerTagUpdateManyWithWhereWithoutTagInput = {
    where: CustomerTagScalarWhereInput
    data: XOR<CustomerTagUpdateManyMutationInput, CustomerTagUncheckedUpdateManyWithoutTagInput>
  }

  export type CustomerCreateWithoutTagsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    notes?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    creditLimit?: Decimal | DecimalJsLike | number | string
    qrToken?: string | null
    qrTokenExpiresAt?: Date | string | null
    reminderInterval?: string
    lastReminderAt?: Date | string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutCustomersInput
    transactions?: TransactionCreateNestedManyWithoutCustomerInput
    reminders?: ReminderCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutTagsInput = {
    id?: string
    shopId: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    notes?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    creditLimit?: Decimal | DecimalJsLike | number | string
    qrToken?: string | null
    qrTokenExpiresAt?: Date | string | null
    reminderInterval?: string
    lastReminderAt?: Date | string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutCustomerInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutTagsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutTagsInput, CustomerUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutCustomersInput = {
    id?: string
    shopId: string
    name: string
    color?: string
    createdAt?: Date | string
  }

  export type TagUncheckedCreateWithoutCustomersInput = {
    id?: string
    shopId: string
    name: string
    color?: string
    createdAt?: Date | string
  }

  export type TagCreateOrConnectWithoutCustomersInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutCustomersInput, TagUncheckedCreateWithoutCustomersInput>
  }

  export type CustomerUpsertWithoutTagsInput = {
    update: XOR<CustomerUpdateWithoutTagsInput, CustomerUncheckedUpdateWithoutTagsInput>
    create: XOR<CustomerCreateWithoutTagsInput, CustomerUncheckedCreateWithoutTagsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutTagsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutTagsInput, CustomerUncheckedUpdateWithoutTagsInput>
  }

  export type CustomerUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reminderInterval?: StringFieldUpdateOperationsInput | string
    lastReminderAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutCustomersNestedInput
    transactions?: TransactionUpdateManyWithoutCustomerNestedInput
    reminders?: ReminderUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reminderInterval?: StringFieldUpdateOperationsInput | string
    lastReminderAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutCustomerNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type TagUpsertWithoutCustomersInput = {
    update: XOR<TagUpdateWithoutCustomersInput, TagUncheckedUpdateWithoutCustomersInput>
    create: XOR<TagCreateWithoutCustomersInput, TagUncheckedCreateWithoutCustomersInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutCustomersInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutCustomersInput, TagUncheckedUpdateWithoutCustomersInput>
  }

  export type TagUpdateWithoutCustomersInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUncheckedUpdateWithoutCustomersInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateWithoutNotesInput = {
    id?: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    description?: string | null
    referenceNumber?: string | null
    paymentMethod?: $Enums.PaymentMethod | null
    transactionDate?: Date | string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    shop: ShopCreateNestedOneWithoutTransactionsInput
    customer: CustomerCreateNestedOneWithoutTransactionsInput
    creator?: UserCreateNestedOneWithoutCreatedTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutNotesInput = {
    id?: string
    shopId: string
    customerId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    description?: string | null
    referenceNumber?: string | null
    paymentMethod?: $Enums.PaymentMethod | null
    transactionDate?: Date | string
    createdBy?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutNotesInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutNotesInput, TransactionUncheckedCreateWithoutNotesInput>
  }

  export type TransactionUpsertWithoutNotesInput = {
    update: XOR<TransactionUpdateWithoutNotesInput, TransactionUncheckedUpdateWithoutNotesInput>
    create: XOR<TransactionCreateWithoutNotesInput, TransactionUncheckedCreateWithoutNotesInput>
    where?: TransactionWhereInput
  }

  export type TransactionUpdateToOneWithWhereWithoutNotesInput = {
    where?: TransactionWhereInput
    data: XOR<TransactionUpdateWithoutNotesInput, TransactionUncheckedUpdateWithoutNotesInput>
  }

  export type TransactionUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutTransactionsNestedInput
    customer?: CustomerUpdateOneRequiredWithoutTransactionsNestedInput
    creator?: UserUpdateOneWithoutCreatedTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopCreateWithoutNotificationsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    pincode?: string | null
    logoUrl?: string | null
    currency?: string
    upiId?: string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutShopInput
    customers?: CustomerCreateNestedManyWithoutShopInput
    transactions?: TransactionCreateNestedManyWithoutShopInput
    subscriptions?: SubscriptionCreateNestedManyWithoutShopInput
    reminders?: ReminderCreateNestedManyWithoutShopInput
  }

  export type ShopUncheckedCreateWithoutNotificationsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    pincode?: string | null
    logoUrl?: string | null
    currency?: string
    upiId?: string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutShopInput
    customers?: CustomerUncheckedCreateNestedManyWithoutShopInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutShopInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutShopInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutShopInput
  }

  export type ShopCreateOrConnectWithoutNotificationsInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutNotificationsInput, ShopUncheckedCreateWithoutNotificationsInput>
  }

  export type ShopUpsertWithoutNotificationsInput = {
    update: XOR<ShopUpdateWithoutNotificationsInput, ShopUncheckedUpdateWithoutNotificationsInput>
    create: XOR<ShopCreateWithoutNotificationsInput, ShopUncheckedCreateWithoutNotificationsInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutNotificationsInput, ShopUncheckedUpdateWithoutNotificationsInput>
  }

  export type ShopUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutShopNestedInput
    customers?: CustomerUpdateManyWithoutShopNestedInput
    transactions?: TransactionUpdateManyWithoutShopNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutShopNestedInput
    reminders?: ReminderUpdateManyWithoutShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    upiId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutShopNestedInput
    customers?: CustomerUncheckedUpdateManyWithoutShopNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutShopNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutShopNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutShopNestedInput
  }

  export type UserCreateManyShopInput = {
    id?: string
    authId: string
    name: string
    phone: string
    email?: string | null
    passwordHash?: string | null
    role?: string
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inviteCode?: string | null
    inviteCodeExpiresAt?: Date | string | null
    inviteCodeUsed?: boolean
  }

  export type CustomerCreateManyShopInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    address?: string | null
    notes?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    creditLimit?: Decimal | DecimalJsLike | number | string
    qrToken?: string | null
    qrTokenExpiresAt?: Date | string | null
    reminderInterval?: string
    lastReminderAt?: Date | string | null
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateManyShopInput = {
    id?: string
    customerId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    description?: string | null
    referenceNumber?: string | null
    paymentMethod?: $Enums.PaymentMethod | null
    transactionDate?: Date | string
    createdBy?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SubscriptionCreateManyShopInput = {
    id?: string
    plan?: $Enums.SubscriptionPlan
    status?: $Enums.SubscriptionStatus
    maxCustomers?: number
    maxUsers?: number
    amount?: Decimal | DecimalJsLike | number | string
    currency?: string
    billingCycle?: string
    startsAt?: Date | string
    expiresAt?: Date | string | null
    cancelledAt?: Date | string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReminderCreateManyShopInput = {
    id?: string
    customerId: string
    channel?: $Enums.ReminderChannel
    status?: $Enums.ReminderStatus
    message: string
    amountDue: Decimal | DecimalJsLike | number | string
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    failedReason?: string | null
    createdBy?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyShopInput = {
    id?: string
    userId: string
    title: string
    message: string
    type: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type UserUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inviteCodeUsed?: BoolFieldUpdateOperationsInput | boolean
    createdTransactions?: TransactionUpdateManyWithoutCreatorNestedInput
    createdReminders?: ReminderUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inviteCodeUsed?: BoolFieldUpdateOperationsInput | boolean
    createdTransactions?: TransactionUncheckedUpdateManyWithoutCreatorNestedInput
    createdReminders?: ReminderUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateManyWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    inviteCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inviteCodeUsed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CustomerUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reminderInterval?: StringFieldUpdateOperationsInput | string
    lastReminderAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutCustomerNestedInput
    reminders?: ReminderUpdateManyWithoutCustomerNestedInput
    tags?: CustomerTagUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reminderInterval?: StringFieldUpdateOperationsInput | string
    lastReminderAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutCustomerNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutCustomerNestedInput
    tags?: CustomerTagUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateManyWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creditLimit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    qrToken?: NullableStringFieldUpdateOperationsInput | string | null
    qrTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reminderInterval?: StringFieldUpdateOperationsInput | string
    lastReminderAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutTransactionsNestedInput
    creator?: UserUpdateOneWithoutCreatedTransactionsNestedInput
    notes?: TransactionNoteUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: TransactionNoteUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateManyWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    maxCustomers?: IntFieldUpdateOperationsInput | number
    maxUsers?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    billingCycle?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    maxCustomers?: IntFieldUpdateOperationsInput | number
    maxUsers?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    billingCycle?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    maxCustomers?: IntFieldUpdateOperationsInput | number
    maxUsers?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    billingCycle?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    message?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedReason?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutRemindersNestedInput
    creator?: UserUpdateOneWithoutCreatedRemindersNestedInput
  }

  export type ReminderUncheckedUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    message?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderUncheckedUpdateManyWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    message?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyCreatorInput = {
    id?: string
    shopId: string
    customerId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    description?: string | null
    referenceNumber?: string | null
    paymentMethod?: $Enums.PaymentMethod | null
    transactionDate?: Date | string
    deletedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ReminderCreateManyCreatorInput = {
    id?: string
    shopId: string
    customerId: string
    channel?: $Enums.ReminderChannel
    status?: $Enums.ReminderStatus
    message: string
    amountDue: Decimal | DecimalJsLike | number | string
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    failedReason?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutTransactionsNestedInput
    customer?: CustomerUpdateOneRequiredWithoutTransactionsNestedInput
    notes?: TransactionNoteUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: TransactionNoteUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    message?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedReason?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutRemindersNestedInput
    customer?: CustomerUpdateOneRequiredWithoutRemindersNestedInput
  }

  export type ReminderUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    message?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedReason?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    message?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedReason?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyCustomerInput = {
    id?: string
    shopId: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    description?: string | null
    referenceNumber?: string | null
    paymentMethod?: $Enums.PaymentMethod | null
    transactionDate?: Date | string
    createdBy?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ReminderCreateManyCustomerInput = {
    id?: string
    shopId: string
    channel?: $Enums.ReminderChannel
    status?: $Enums.ReminderStatus
    message: string
    amountDue: Decimal | DecimalJsLike | number | string
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    failedReason?: string | null
    createdBy?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerTagCreateManyCustomerInput = {
    id?: string
    tagId: string
    createdAt?: Date | string
  }

  export type TransactionUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutTransactionsNestedInput
    creator?: UserUpdateOneWithoutCreatedTransactionsNestedInput
    notes?: TransactionNoteUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: TransactionNoteUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    message?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedReason?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutRemindersNestedInput
    creator?: UserUpdateOneWithoutCreatedRemindersNestedInput
  }

  export type ReminderUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    message?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    channel?: EnumReminderChannelFieldUpdateOperationsInput | $Enums.ReminderChannel
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    message?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerTagUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tag?: TagUpdateOneRequiredWithoutCustomersNestedInput
  }

  export type CustomerTagUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerTagUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionNoteCreateManyTransactionInput = {
    id?: string
    shopId: string
    userId?: string | null
    content: string
    isDispute?: boolean
    createdAt?: Date | string
  }

  export type TransactionNoteUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    isDispute?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionNoteUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    isDispute?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionNoteUncheckedUpdateManyWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    isDispute?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerTagCreateManyTagInput = {
    id?: string
    customerId: string
    createdAt?: Date | string
  }

  export type CustomerTagUpdateWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutTagsNestedInput
  }

  export type CustomerTagUncheckedUpdateWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerTagUncheckedUpdateManyWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}