
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model Menu
 * 
 */
export type Menu = $Result.DefaultSelection<Prisma.$MenuPayload>
/**
 * Model Estimate
 * 
 */
export type Estimate = $Result.DefaultSelection<Prisma.$EstimatePayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model ServiceGallery
 * 
 */
export type ServiceGallery = $Result.DefaultSelection<Prisma.$ServiceGalleryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const MenuCategory: {
  BUNSIK: 'BUNSIK',
  MEALS: 'MEALS',
  DRINKS: 'DRINKS',
  HOTDOGS_BURGERS: 'HOTDOGS_BURGERS',
  SNACKS: 'SNACKS',
  DESSERTS: 'DESSERTS'
};

export type MenuCategory = (typeof MenuCategory)[keyof typeof MenuCategory]


export const EstimateStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  REPLIED: 'REPLIED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

export type EstimateStatus = (typeof EstimateStatus)[keyof typeof EstimateStatus]


export const Role: {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type MenuCategory = $Enums.MenuCategory

export const MenuCategory: typeof $Enums.MenuCategory

export type EstimateStatus = $Enums.EstimateStatus

export const EstimateStatus: typeof $Enums.EstimateStatus

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Posts
 * const posts = await prisma.post.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Posts
   * const posts = await prisma.post.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs>;

  /**
   * `prisma.menu`: Exposes CRUD operations for the **Menu** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Menus
    * const menus = await prisma.menu.findMany()
    * ```
    */
  get menu(): Prisma.MenuDelegate<ExtArgs>;

  /**
   * `prisma.estimate`: Exposes CRUD operations for the **Estimate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Estimates
    * const estimates = await prisma.estimate.findMany()
    * ```
    */
  get estimate(): Prisma.EstimateDelegate<ExtArgs>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs>;

  /**
   * `prisma.serviceGallery`: Exposes CRUD operations for the **ServiceGallery** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceGalleries
    * const serviceGalleries = await prisma.serviceGallery.findMany()
    * ```
    */
  get serviceGallery(): Prisma.ServiceGalleryDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Post: 'Post',
    Menu: 'Menu',
    Estimate: 'Estimate',
    Review: 'Review',
    Admin: 'Admin',
    ServiceGallery: 'ServiceGallery'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "post" | "menu" | "estimate" | "review" | "admin" | "serviceGallery"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      Menu: {
        payload: Prisma.$MenuPayload<ExtArgs>
        fields: Prisma.MenuFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MenuFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MenuFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          findFirst: {
            args: Prisma.MenuFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MenuFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          findMany: {
            args: Prisma.MenuFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>[]
          }
          create: {
            args: Prisma.MenuCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          createMany: {
            args: Prisma.MenuCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MenuCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>[]
          }
          delete: {
            args: Prisma.MenuDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          update: {
            args: Prisma.MenuUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          deleteMany: {
            args: Prisma.MenuDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MenuUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MenuUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuPayload>
          }
          aggregate: {
            args: Prisma.MenuAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMenu>
          }
          groupBy: {
            args: Prisma.MenuGroupByArgs<ExtArgs>
            result: $Utils.Optional<MenuGroupByOutputType>[]
          }
          count: {
            args: Prisma.MenuCountArgs<ExtArgs>
            result: $Utils.Optional<MenuCountAggregateOutputType> | number
          }
        }
      }
      Estimate: {
        payload: Prisma.$EstimatePayload<ExtArgs>
        fields: Prisma.EstimateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EstimateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EstimateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>
          }
          findFirst: {
            args: Prisma.EstimateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EstimateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>
          }
          findMany: {
            args: Prisma.EstimateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>[]
          }
          create: {
            args: Prisma.EstimateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>
          }
          createMany: {
            args: Prisma.EstimateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EstimateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>[]
          }
          delete: {
            args: Prisma.EstimateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>
          }
          update: {
            args: Prisma.EstimateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>
          }
          deleteMany: {
            args: Prisma.EstimateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EstimateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EstimateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstimatePayload>
          }
          aggregate: {
            args: Prisma.EstimateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEstimate>
          }
          groupBy: {
            args: Prisma.EstimateGroupByArgs<ExtArgs>
            result: $Utils.Optional<EstimateGroupByOutputType>[]
          }
          count: {
            args: Prisma.EstimateCountArgs<ExtArgs>
            result: $Utils.Optional<EstimateCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      ServiceGallery: {
        payload: Prisma.$ServiceGalleryPayload<ExtArgs>
        fields: Prisma.ServiceGalleryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceGalleryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceGalleryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceGalleryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceGalleryPayload>
          }
          findFirst: {
            args: Prisma.ServiceGalleryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceGalleryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceGalleryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceGalleryPayload>
          }
          findMany: {
            args: Prisma.ServiceGalleryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceGalleryPayload>[]
          }
          create: {
            args: Prisma.ServiceGalleryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceGalleryPayload>
          }
          createMany: {
            args: Prisma.ServiceGalleryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceGalleryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceGalleryPayload>[]
          }
          delete: {
            args: Prisma.ServiceGalleryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceGalleryPayload>
          }
          update: {
            args: Prisma.ServiceGalleryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceGalleryPayload>
          }
          deleteMany: {
            args: Prisma.ServiceGalleryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceGalleryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ServiceGalleryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceGalleryPayload>
          }
          aggregate: {
            args: Prisma.ServiceGalleryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceGallery>
          }
          groupBy: {
            args: Prisma.ServiceGalleryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGalleryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceGalleryCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceGalleryCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Models
   */

  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    content: string | null
    category: string | null
    date: Date | null
    author: string | null
    hoverText: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    content: string | null
    category: string | null
    date: Date | null
    author: string | null
    hoverText: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    slug: number
    title: number
    content: number
    category: number
    date: number
    author: number
    tags: number
    images: number
    hoverText: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PostMinAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    content?: true
    category?: true
    date?: true
    author?: true
    hoverText?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    content?: true
    category?: true
    date?: true
    author?: true
    hoverText?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    content?: true
    category?: true
    date?: true
    author?: true
    tags?: true
    images?: true
    hoverText?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: string
    slug: string
    title: string
    content: string
    category: string
    date: Date
    author: string
    tags: string[]
    images: string[]
    hoverText: string | null
    createdAt: Date
    updatedAt: Date
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    content?: boolean
    category?: boolean
    date?: boolean
    author?: boolean
    tags?: boolean
    images?: boolean
    hoverText?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    content?: boolean
    category?: boolean
    date?: boolean
    author?: boolean
    tags?: boolean
    images?: boolean
    hoverText?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    slug?: boolean
    title?: boolean
    content?: boolean
    category?: boolean
    date?: boolean
    author?: boolean
    tags?: boolean
    images?: boolean
    hoverText?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      title: string
      content: string
      category: string
      date: Date
      author: string
      tags: string[]
      images: string[]
      hoverText: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
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
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Post model
   */ 
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'String'>
    readonly slug: FieldRef<"Post", 'String'>
    readonly title: FieldRef<"Post", 'String'>
    readonly content: FieldRef<"Post", 'String'>
    readonly category: FieldRef<"Post", 'String'>
    readonly date: FieldRef<"Post", 'DateTime'>
    readonly author: FieldRef<"Post", 'String'>
    readonly tags: FieldRef<"Post", 'String[]'>
    readonly images: FieldRef<"Post", 'String[]'>
    readonly hoverText: FieldRef<"Post", 'String'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
  }


  /**
   * Model Menu
   */

  export type AggregateMenu = {
    _count: MenuCountAggregateOutputType | null
    _avg: MenuAvgAggregateOutputType | null
    _sum: MenuSumAggregateOutputType | null
    _min: MenuMinAggregateOutputType | null
    _max: MenuMaxAggregateOutputType | null
  }

  export type MenuAvgAggregateOutputType = {
    spicyLevel: number | null
  }

  export type MenuSumAggregateOutputType = {
    spicyLevel: number | null
  }

  export type MenuMinAggregateOutputType = {
    id: string | null
    name: string | null
    nameEn: string | null
    description: string | null
    category: $Enums.MenuCategory | null
    categorySlug: string | null
    isPopular: boolean | null
    spicyLevel: number | null
    isNew: boolean | null
    isVegetarian: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MenuMaxAggregateOutputType = {
    id: string | null
    name: string | null
    nameEn: string | null
    description: string | null
    category: $Enums.MenuCategory | null
    categorySlug: string | null
    isPopular: boolean | null
    spicyLevel: number | null
    isNew: boolean | null
    isVegetarian: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MenuCountAggregateOutputType = {
    id: number
    name: number
    nameEn: number
    description: number
    category: number
    categorySlug: number
    tags: number
    isPopular: number
    spicyLevel: number
    isNew: number
    isVegetarian: number
    allergens: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MenuAvgAggregateInputType = {
    spicyLevel?: true
  }

  export type MenuSumAggregateInputType = {
    spicyLevel?: true
  }

  export type MenuMinAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    description?: true
    category?: true
    categorySlug?: true
    isPopular?: true
    spicyLevel?: true
    isNew?: true
    isVegetarian?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MenuMaxAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    description?: true
    category?: true
    categorySlug?: true
    isPopular?: true
    spicyLevel?: true
    isNew?: true
    isVegetarian?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MenuCountAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    description?: true
    category?: true
    categorySlug?: true
    tags?: true
    isPopular?: true
    spicyLevel?: true
    isNew?: true
    isVegetarian?: true
    allergens?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MenuAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Menu to aggregate.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Menus
    **/
    _count?: true | MenuCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MenuAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MenuSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MenuMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MenuMaxAggregateInputType
  }

  export type GetMenuAggregateType<T extends MenuAggregateArgs> = {
        [P in keyof T & keyof AggregateMenu]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMenu[P]>
      : GetScalarType<T[P], AggregateMenu[P]>
  }




  export type MenuGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuWhereInput
    orderBy?: MenuOrderByWithAggregationInput | MenuOrderByWithAggregationInput[]
    by: MenuScalarFieldEnum[] | MenuScalarFieldEnum
    having?: MenuScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MenuCountAggregateInputType | true
    _avg?: MenuAvgAggregateInputType
    _sum?: MenuSumAggregateInputType
    _min?: MenuMinAggregateInputType
    _max?: MenuMaxAggregateInputType
  }

  export type MenuGroupByOutputType = {
    id: string
    name: string
    nameEn: string | null
    description: string
    category: $Enums.MenuCategory
    categorySlug: string
    tags: string[]
    isPopular: boolean
    spicyLevel: number | null
    isNew: boolean
    isVegetarian: boolean
    allergens: string[]
    image: string
    createdAt: Date
    updatedAt: Date
    _count: MenuCountAggregateOutputType | null
    _avg: MenuAvgAggregateOutputType | null
    _sum: MenuSumAggregateOutputType | null
    _min: MenuMinAggregateOutputType | null
    _max: MenuMaxAggregateOutputType | null
  }

  type GetMenuGroupByPayload<T extends MenuGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MenuGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MenuGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MenuGroupByOutputType[P]>
            : GetScalarType<T[P], MenuGroupByOutputType[P]>
        }
      >
    >


  export type MenuSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nameEn?: boolean
    description?: boolean
    category?: boolean
    categorySlug?: boolean
    tags?: boolean
    isPopular?: boolean
    spicyLevel?: boolean
    isNew?: boolean
    isVegetarian?: boolean
    allergens?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["menu"]>

  export type MenuSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nameEn?: boolean
    description?: boolean
    category?: boolean
    categorySlug?: boolean
    tags?: boolean
    isPopular?: boolean
    spicyLevel?: boolean
    isNew?: boolean
    isVegetarian?: boolean
    allergens?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["menu"]>

  export type MenuSelectScalar = {
    id?: boolean
    name?: boolean
    nameEn?: boolean
    description?: boolean
    category?: boolean
    categorySlug?: boolean
    tags?: boolean
    isPopular?: boolean
    spicyLevel?: boolean
    isNew?: boolean
    isVegetarian?: boolean
    allergens?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $MenuPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Menu"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      nameEn: string | null
      description: string
      category: $Enums.MenuCategory
      categorySlug: string
      tags: string[]
      isPopular: boolean
      spicyLevel: number | null
      isNew: boolean
      isVegetarian: boolean
      allergens: string[]
      image: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["menu"]>
    composites: {}
  }

  type MenuGetPayload<S extends boolean | null | undefined | MenuDefaultArgs> = $Result.GetResult<Prisma.$MenuPayload, S>

  type MenuCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MenuFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MenuCountAggregateInputType | true
    }

  export interface MenuDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Menu'], meta: { name: 'Menu' } }
    /**
     * Find zero or one Menu that matches the filter.
     * @param {MenuFindUniqueArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuFindUniqueArgs>(args: SelectSubset<T, MenuFindUniqueArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Menu that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MenuFindUniqueOrThrowArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuFindUniqueOrThrowArgs>(args: SelectSubset<T, MenuFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Menu that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindFirstArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuFindFirstArgs>(args?: SelectSubset<T, MenuFindFirstArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Menu that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindFirstOrThrowArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuFindFirstOrThrowArgs>(args?: SelectSubset<T, MenuFindFirstOrThrowArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Menus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Menus
     * const menus = await prisma.menu.findMany()
     * 
     * // Get first 10 Menus
     * const menus = await prisma.menu.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const menuWithIdOnly = await prisma.menu.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MenuFindManyArgs>(args?: SelectSubset<T, MenuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Menu.
     * @param {MenuCreateArgs} args - Arguments to create a Menu.
     * @example
     * // Create one Menu
     * const Menu = await prisma.menu.create({
     *   data: {
     *     // ... data to create a Menu
     *   }
     * })
     * 
     */
    create<T extends MenuCreateArgs>(args: SelectSubset<T, MenuCreateArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Menus.
     * @param {MenuCreateManyArgs} args - Arguments to create many Menus.
     * @example
     * // Create many Menus
     * const menu = await prisma.menu.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MenuCreateManyArgs>(args?: SelectSubset<T, MenuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Menus and returns the data saved in the database.
     * @param {MenuCreateManyAndReturnArgs} args - Arguments to create many Menus.
     * @example
     * // Create many Menus
     * const menu = await prisma.menu.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Menus and only return the `id`
     * const menuWithIdOnly = await prisma.menu.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MenuCreateManyAndReturnArgs>(args?: SelectSubset<T, MenuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Menu.
     * @param {MenuDeleteArgs} args - Arguments to delete one Menu.
     * @example
     * // Delete one Menu
     * const Menu = await prisma.menu.delete({
     *   where: {
     *     // ... filter to delete one Menu
     *   }
     * })
     * 
     */
    delete<T extends MenuDeleteArgs>(args: SelectSubset<T, MenuDeleteArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Menu.
     * @param {MenuUpdateArgs} args - Arguments to update one Menu.
     * @example
     * // Update one Menu
     * const menu = await prisma.menu.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MenuUpdateArgs>(args: SelectSubset<T, MenuUpdateArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Menus.
     * @param {MenuDeleteManyArgs} args - Arguments to filter Menus to delete.
     * @example
     * // Delete a few Menus
     * const { count } = await prisma.menu.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MenuDeleteManyArgs>(args?: SelectSubset<T, MenuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Menus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Menus
     * const menu = await prisma.menu.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MenuUpdateManyArgs>(args: SelectSubset<T, MenuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Menu.
     * @param {MenuUpsertArgs} args - Arguments to update or create a Menu.
     * @example
     * // Update or create a Menu
     * const menu = await prisma.menu.upsert({
     *   create: {
     *     // ... data to create a Menu
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Menu we want to update
     *   }
     * })
     */
    upsert<T extends MenuUpsertArgs>(args: SelectSubset<T, MenuUpsertArgs<ExtArgs>>): Prisma__MenuClient<$Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Menus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuCountArgs} args - Arguments to filter Menus to count.
     * @example
     * // Count the number of Menus
     * const count = await prisma.menu.count({
     *   where: {
     *     // ... the filter for the Menus we want to count
     *   }
     * })
    **/
    count<T extends MenuCountArgs>(
      args?: Subset<T, MenuCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MenuCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Menu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MenuAggregateArgs>(args: Subset<T, MenuAggregateArgs>): Prisma.PrismaPromise<GetMenuAggregateType<T>>

    /**
     * Group by Menu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuGroupByArgs} args - Group by arguments.
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
      T extends MenuGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MenuGroupByArgs['orderBy'] }
        : { orderBy?: MenuGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MenuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Menu model
   */
  readonly fields: MenuFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Menu.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MenuClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Menu model
   */ 
  interface MenuFieldRefs {
    readonly id: FieldRef<"Menu", 'String'>
    readonly name: FieldRef<"Menu", 'String'>
    readonly nameEn: FieldRef<"Menu", 'String'>
    readonly description: FieldRef<"Menu", 'String'>
    readonly category: FieldRef<"Menu", 'MenuCategory'>
    readonly categorySlug: FieldRef<"Menu", 'String'>
    readonly tags: FieldRef<"Menu", 'String[]'>
    readonly isPopular: FieldRef<"Menu", 'Boolean'>
    readonly spicyLevel: FieldRef<"Menu", 'Int'>
    readonly isNew: FieldRef<"Menu", 'Boolean'>
    readonly isVegetarian: FieldRef<"Menu", 'Boolean'>
    readonly allergens: FieldRef<"Menu", 'String[]'>
    readonly image: FieldRef<"Menu", 'String'>
    readonly createdAt: FieldRef<"Menu", 'DateTime'>
    readonly updatedAt: FieldRef<"Menu", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Menu findUnique
   */
  export type MenuFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu findUniqueOrThrow
   */
  export type MenuFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu findFirst
   */
  export type MenuFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Menus.
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Menus.
     */
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu findFirstOrThrow
   */
  export type MenuFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Filter, which Menu to fetch.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Menus.
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Menus.
     */
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu findMany
   */
  export type MenuFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Filter, which Menus to fetch.
     */
    where?: MenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menus to fetch.
     */
    orderBy?: MenuOrderByWithRelationInput | MenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Menus.
     */
    cursor?: MenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menus.
     */
    skip?: number
    distinct?: MenuScalarFieldEnum | MenuScalarFieldEnum[]
  }

  /**
   * Menu create
   */
  export type MenuCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * The data needed to create a Menu.
     */
    data: XOR<MenuCreateInput, MenuUncheckedCreateInput>
  }

  /**
   * Menu createMany
   */
  export type MenuCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Menus.
     */
    data: MenuCreateManyInput | MenuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Menu createManyAndReturn
   */
  export type MenuCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Menus.
     */
    data: MenuCreateManyInput | MenuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Menu update
   */
  export type MenuUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * The data needed to update a Menu.
     */
    data: XOR<MenuUpdateInput, MenuUncheckedUpdateInput>
    /**
     * Choose, which Menu to update.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu updateMany
   */
  export type MenuUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Menus.
     */
    data: XOR<MenuUpdateManyMutationInput, MenuUncheckedUpdateManyInput>
    /**
     * Filter which Menus to update
     */
    where?: MenuWhereInput
  }

  /**
   * Menu upsert
   */
  export type MenuUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * The filter to search for the Menu to update in case it exists.
     */
    where: MenuWhereUniqueInput
    /**
     * In case the Menu found by the `where` argument doesn't exist, create a new Menu with this data.
     */
    create: XOR<MenuCreateInput, MenuUncheckedCreateInput>
    /**
     * In case the Menu was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MenuUpdateInput, MenuUncheckedUpdateInput>
  }

  /**
   * Menu delete
   */
  export type MenuDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
    /**
     * Filter which Menu to delete.
     */
    where: MenuWhereUniqueInput
  }

  /**
   * Menu deleteMany
   */
  export type MenuDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Menus to delete
     */
    where?: MenuWhereInput
  }

  /**
   * Menu without action
   */
  export type MenuDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: MenuSelect<ExtArgs> | null
  }


  /**
   * Model Estimate
   */

  export type AggregateEstimate = {
    _count: EstimateCountAggregateOutputType | null
    _avg: EstimateAvgAggregateOutputType | null
    _sum: EstimateSumAggregateOutputType | null
    _min: EstimateMinAggregateOutputType | null
    _max: EstimateMaxAggregateOutputType | null
  }

  export type EstimateAvgAggregateOutputType = {
    attendees: number | null
  }

  export type EstimateSumAggregateOutputType = {
    attendees: number | null
  }

  export type EstimateMinAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    email: string | null
    service: string | null
    date: Date | null
    location: string | null
    attendees: number | null
    details: string | null
    adminNotes: string | null
    status: $Enums.EstimateStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EstimateMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    email: string | null
    service: string | null
    date: Date | null
    location: string | null
    attendees: number | null
    details: string | null
    adminNotes: string | null
    status: $Enums.EstimateStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EstimateCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    email: number
    service: number
    date: number
    location: number
    attendees: number
    details: number
    adminNotes: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EstimateAvgAggregateInputType = {
    attendees?: true
  }

  export type EstimateSumAggregateInputType = {
    attendees?: true
  }

  export type EstimateMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    service?: true
    date?: true
    location?: true
    attendees?: true
    details?: true
    adminNotes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EstimateMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    service?: true
    date?: true
    location?: true
    attendees?: true
    details?: true
    adminNotes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EstimateCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    service?: true
    date?: true
    location?: true
    attendees?: true
    details?: true
    adminNotes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EstimateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Estimate to aggregate.
     */
    where?: EstimateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estimates to fetch.
     */
    orderBy?: EstimateOrderByWithRelationInput | EstimateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EstimateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estimates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estimates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Estimates
    **/
    _count?: true | EstimateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EstimateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EstimateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EstimateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EstimateMaxAggregateInputType
  }

  export type GetEstimateAggregateType<T extends EstimateAggregateArgs> = {
        [P in keyof T & keyof AggregateEstimate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEstimate[P]>
      : GetScalarType<T[P], AggregateEstimate[P]>
  }




  export type EstimateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EstimateWhereInput
    orderBy?: EstimateOrderByWithAggregationInput | EstimateOrderByWithAggregationInput[]
    by: EstimateScalarFieldEnum[] | EstimateScalarFieldEnum
    having?: EstimateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EstimateCountAggregateInputType | true
    _avg?: EstimateAvgAggregateInputType
    _sum?: EstimateSumAggregateInputType
    _min?: EstimateMinAggregateInputType
    _max?: EstimateMaxAggregateInputType
  }

  export type EstimateGroupByOutputType = {
    id: string
    name: string
    phone: string
    email: string | null
    service: string
    date: Date
    location: string
    attendees: number
    details: string | null
    adminNotes: string | null
    status: $Enums.EstimateStatus
    createdAt: Date
    updatedAt: Date
    _count: EstimateCountAggregateOutputType | null
    _avg: EstimateAvgAggregateOutputType | null
    _sum: EstimateSumAggregateOutputType | null
    _min: EstimateMinAggregateOutputType | null
    _max: EstimateMaxAggregateOutputType | null
  }

  type GetEstimateGroupByPayload<T extends EstimateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EstimateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EstimateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EstimateGroupByOutputType[P]>
            : GetScalarType<T[P], EstimateGroupByOutputType[P]>
        }
      >
    >


  export type EstimateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    service?: boolean
    date?: boolean
    location?: boolean
    attendees?: boolean
    details?: boolean
    adminNotes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["estimate"]>

  export type EstimateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    service?: boolean
    date?: boolean
    location?: boolean
    attendees?: boolean
    details?: boolean
    adminNotes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["estimate"]>

  export type EstimateSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    service?: boolean
    date?: boolean
    location?: boolean
    attendees?: boolean
    details?: boolean
    adminNotes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $EstimatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Estimate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      phone: string
      email: string | null
      service: string
      date: Date
      location: string
      attendees: number
      details: string | null
      adminNotes: string | null
      status: $Enums.EstimateStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["estimate"]>
    composites: {}
  }

  type EstimateGetPayload<S extends boolean | null | undefined | EstimateDefaultArgs> = $Result.GetResult<Prisma.$EstimatePayload, S>

  type EstimateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EstimateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EstimateCountAggregateInputType | true
    }

  export interface EstimateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Estimate'], meta: { name: 'Estimate' } }
    /**
     * Find zero or one Estimate that matches the filter.
     * @param {EstimateFindUniqueArgs} args - Arguments to find a Estimate
     * @example
     * // Get one Estimate
     * const estimate = await prisma.estimate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EstimateFindUniqueArgs>(args: SelectSubset<T, EstimateFindUniqueArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Estimate that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EstimateFindUniqueOrThrowArgs} args - Arguments to find a Estimate
     * @example
     * // Get one Estimate
     * const estimate = await prisma.estimate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EstimateFindUniqueOrThrowArgs>(args: SelectSubset<T, EstimateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Estimate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstimateFindFirstArgs} args - Arguments to find a Estimate
     * @example
     * // Get one Estimate
     * const estimate = await prisma.estimate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EstimateFindFirstArgs>(args?: SelectSubset<T, EstimateFindFirstArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Estimate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstimateFindFirstOrThrowArgs} args - Arguments to find a Estimate
     * @example
     * // Get one Estimate
     * const estimate = await prisma.estimate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EstimateFindFirstOrThrowArgs>(args?: SelectSubset<T, EstimateFindFirstOrThrowArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Estimates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstimateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Estimates
     * const estimates = await prisma.estimate.findMany()
     * 
     * // Get first 10 Estimates
     * const estimates = await prisma.estimate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const estimateWithIdOnly = await prisma.estimate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EstimateFindManyArgs>(args?: SelectSubset<T, EstimateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Estimate.
     * @param {EstimateCreateArgs} args - Arguments to create a Estimate.
     * @example
     * // Create one Estimate
     * const Estimate = await prisma.estimate.create({
     *   data: {
     *     // ... data to create a Estimate
     *   }
     * })
     * 
     */
    create<T extends EstimateCreateArgs>(args: SelectSubset<T, EstimateCreateArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Estimates.
     * @param {EstimateCreateManyArgs} args - Arguments to create many Estimates.
     * @example
     * // Create many Estimates
     * const estimate = await prisma.estimate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EstimateCreateManyArgs>(args?: SelectSubset<T, EstimateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Estimates and returns the data saved in the database.
     * @param {EstimateCreateManyAndReturnArgs} args - Arguments to create many Estimates.
     * @example
     * // Create many Estimates
     * const estimate = await prisma.estimate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Estimates and only return the `id`
     * const estimateWithIdOnly = await prisma.estimate.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EstimateCreateManyAndReturnArgs>(args?: SelectSubset<T, EstimateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Estimate.
     * @param {EstimateDeleteArgs} args - Arguments to delete one Estimate.
     * @example
     * // Delete one Estimate
     * const Estimate = await prisma.estimate.delete({
     *   where: {
     *     // ... filter to delete one Estimate
     *   }
     * })
     * 
     */
    delete<T extends EstimateDeleteArgs>(args: SelectSubset<T, EstimateDeleteArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Estimate.
     * @param {EstimateUpdateArgs} args - Arguments to update one Estimate.
     * @example
     * // Update one Estimate
     * const estimate = await prisma.estimate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EstimateUpdateArgs>(args: SelectSubset<T, EstimateUpdateArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Estimates.
     * @param {EstimateDeleteManyArgs} args - Arguments to filter Estimates to delete.
     * @example
     * // Delete a few Estimates
     * const { count } = await prisma.estimate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EstimateDeleteManyArgs>(args?: SelectSubset<T, EstimateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Estimates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstimateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Estimates
     * const estimate = await prisma.estimate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EstimateUpdateManyArgs>(args: SelectSubset<T, EstimateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Estimate.
     * @param {EstimateUpsertArgs} args - Arguments to update or create a Estimate.
     * @example
     * // Update or create a Estimate
     * const estimate = await prisma.estimate.upsert({
     *   create: {
     *     // ... data to create a Estimate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Estimate we want to update
     *   }
     * })
     */
    upsert<T extends EstimateUpsertArgs>(args: SelectSubset<T, EstimateUpsertArgs<ExtArgs>>): Prisma__EstimateClient<$Result.GetResult<Prisma.$EstimatePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Estimates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstimateCountArgs} args - Arguments to filter Estimates to count.
     * @example
     * // Count the number of Estimates
     * const count = await prisma.estimate.count({
     *   where: {
     *     // ... the filter for the Estimates we want to count
     *   }
     * })
    **/
    count<T extends EstimateCountArgs>(
      args?: Subset<T, EstimateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EstimateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Estimate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstimateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EstimateAggregateArgs>(args: Subset<T, EstimateAggregateArgs>): Prisma.PrismaPromise<GetEstimateAggregateType<T>>

    /**
     * Group by Estimate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstimateGroupByArgs} args - Group by arguments.
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
      T extends EstimateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EstimateGroupByArgs['orderBy'] }
        : { orderBy?: EstimateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EstimateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEstimateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Estimate model
   */
  readonly fields: EstimateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Estimate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EstimateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Estimate model
   */ 
  interface EstimateFieldRefs {
    readonly id: FieldRef<"Estimate", 'String'>
    readonly name: FieldRef<"Estimate", 'String'>
    readonly phone: FieldRef<"Estimate", 'String'>
    readonly email: FieldRef<"Estimate", 'String'>
    readonly service: FieldRef<"Estimate", 'String'>
    readonly date: FieldRef<"Estimate", 'DateTime'>
    readonly location: FieldRef<"Estimate", 'String'>
    readonly attendees: FieldRef<"Estimate", 'Int'>
    readonly details: FieldRef<"Estimate", 'String'>
    readonly adminNotes: FieldRef<"Estimate", 'String'>
    readonly status: FieldRef<"Estimate", 'EstimateStatus'>
    readonly createdAt: FieldRef<"Estimate", 'DateTime'>
    readonly updatedAt: FieldRef<"Estimate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Estimate findUnique
   */
  export type EstimateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Filter, which Estimate to fetch.
     */
    where: EstimateWhereUniqueInput
  }

  /**
   * Estimate findUniqueOrThrow
   */
  export type EstimateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Filter, which Estimate to fetch.
     */
    where: EstimateWhereUniqueInput
  }

  /**
   * Estimate findFirst
   */
  export type EstimateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Filter, which Estimate to fetch.
     */
    where?: EstimateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estimates to fetch.
     */
    orderBy?: EstimateOrderByWithRelationInput | EstimateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Estimates.
     */
    cursor?: EstimateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estimates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estimates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Estimates.
     */
    distinct?: EstimateScalarFieldEnum | EstimateScalarFieldEnum[]
  }

  /**
   * Estimate findFirstOrThrow
   */
  export type EstimateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Filter, which Estimate to fetch.
     */
    where?: EstimateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estimates to fetch.
     */
    orderBy?: EstimateOrderByWithRelationInput | EstimateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Estimates.
     */
    cursor?: EstimateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estimates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estimates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Estimates.
     */
    distinct?: EstimateScalarFieldEnum | EstimateScalarFieldEnum[]
  }

  /**
   * Estimate findMany
   */
  export type EstimateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Filter, which Estimates to fetch.
     */
    where?: EstimateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estimates to fetch.
     */
    orderBy?: EstimateOrderByWithRelationInput | EstimateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Estimates.
     */
    cursor?: EstimateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estimates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estimates.
     */
    skip?: number
    distinct?: EstimateScalarFieldEnum | EstimateScalarFieldEnum[]
  }

  /**
   * Estimate create
   */
  export type EstimateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * The data needed to create a Estimate.
     */
    data: XOR<EstimateCreateInput, EstimateUncheckedCreateInput>
  }

  /**
   * Estimate createMany
   */
  export type EstimateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Estimates.
     */
    data: EstimateCreateManyInput | EstimateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Estimate createManyAndReturn
   */
  export type EstimateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Estimates.
     */
    data: EstimateCreateManyInput | EstimateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Estimate update
   */
  export type EstimateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * The data needed to update a Estimate.
     */
    data: XOR<EstimateUpdateInput, EstimateUncheckedUpdateInput>
    /**
     * Choose, which Estimate to update.
     */
    where: EstimateWhereUniqueInput
  }

  /**
   * Estimate updateMany
   */
  export type EstimateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Estimates.
     */
    data: XOR<EstimateUpdateManyMutationInput, EstimateUncheckedUpdateManyInput>
    /**
     * Filter which Estimates to update
     */
    where?: EstimateWhereInput
  }

  /**
   * Estimate upsert
   */
  export type EstimateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * The filter to search for the Estimate to update in case it exists.
     */
    where: EstimateWhereUniqueInput
    /**
     * In case the Estimate found by the `where` argument doesn't exist, create a new Estimate with this data.
     */
    create: XOR<EstimateCreateInput, EstimateUncheckedCreateInput>
    /**
     * In case the Estimate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EstimateUpdateInput, EstimateUncheckedUpdateInput>
  }

  /**
   * Estimate delete
   */
  export type EstimateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
    /**
     * Filter which Estimate to delete.
     */
    where: EstimateWhereUniqueInput
  }

  /**
   * Estimate deleteMany
   */
  export type EstimateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Estimates to delete
     */
    where?: EstimateWhereInput
  }

  /**
   * Estimate without action
   */
  export type EstimateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estimate
     */
    select?: EstimateSelect<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    name: string | null
    business: string | null
    rating: number | null
    content: string | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    name: string | null
    business: string | null
    rating: number | null
    content: string | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    name: number
    business: number
    rating: number
    content: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    name?: true
    business?: true
    rating?: true
    content?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    name?: true
    business?: true
    rating?: true
    content?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    name?: true
    business?: true
    rating?: true
    content?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    name: string
    business: string
    rating: number
    content: string
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    business?: boolean
    rating?: boolean
    content?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    business?: boolean
    rating?: boolean
    content?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    name?: boolean
    business?: boolean
    rating?: boolean
    content?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      business: string
      rating: number
      content: string
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
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
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Review model
   */ 
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly name: FieldRef<"Review", 'String'>
    readonly business: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly content: FieldRef<"Review", 'String'>
    readonly image: FieldRef<"Review", 'String'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
    readonly updatedAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
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
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Admin model
   */ 
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'String'>
    readonly email: FieldRef<"Admin", 'String'>
    readonly password: FieldRef<"Admin", 'String'>
    readonly name: FieldRef<"Admin", 'String'>
    readonly role: FieldRef<"Admin", 'Role'>
    readonly createdAt: FieldRef<"Admin", 'DateTime'>
    readonly updatedAt: FieldRef<"Admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
  }


  /**
   * Model ServiceGallery
   */

  export type AggregateServiceGallery = {
    _count: ServiceGalleryCountAggregateOutputType | null
    _avg: ServiceGalleryAvgAggregateOutputType | null
    _sum: ServiceGallerySumAggregateOutputType | null
    _min: ServiceGalleryMinAggregateOutputType | null
    _max: ServiceGalleryMaxAggregateOutputType | null
  }

  export type ServiceGalleryAvgAggregateOutputType = {
    order: number | null
  }

  export type ServiceGallerySumAggregateOutputType = {
    order: number | null
  }

  export type ServiceGalleryMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    image: string | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceGalleryMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    image: string | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceGalleryCountAggregateOutputType = {
    id: number
    title: number
    description: number
    image: number
    order: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceGalleryAvgAggregateInputType = {
    order?: true
  }

  export type ServiceGallerySumAggregateInputType = {
    order?: true
  }

  export type ServiceGalleryMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    image?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceGalleryMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    image?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceGalleryCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    image?: true
    order?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceGalleryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceGallery to aggregate.
     */
    where?: ServiceGalleryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceGalleries to fetch.
     */
    orderBy?: ServiceGalleryOrderByWithRelationInput | ServiceGalleryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceGalleryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceGalleries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceGalleries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceGalleries
    **/
    _count?: true | ServiceGalleryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceGalleryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceGallerySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceGalleryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceGalleryMaxAggregateInputType
  }

  export type GetServiceGalleryAggregateType<T extends ServiceGalleryAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceGallery]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceGallery[P]>
      : GetScalarType<T[P], AggregateServiceGallery[P]>
  }




  export type ServiceGalleryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceGalleryWhereInput
    orderBy?: ServiceGalleryOrderByWithAggregationInput | ServiceGalleryOrderByWithAggregationInput[]
    by: ServiceGalleryScalarFieldEnum[] | ServiceGalleryScalarFieldEnum
    having?: ServiceGalleryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceGalleryCountAggregateInputType | true
    _avg?: ServiceGalleryAvgAggregateInputType
    _sum?: ServiceGallerySumAggregateInputType
    _min?: ServiceGalleryMinAggregateInputType
    _max?: ServiceGalleryMaxAggregateInputType
  }

  export type ServiceGalleryGroupByOutputType = {
    id: string
    title: string
    description: string
    image: string
    order: number
    createdAt: Date
    updatedAt: Date
    _count: ServiceGalleryCountAggregateOutputType | null
    _avg: ServiceGalleryAvgAggregateOutputType | null
    _sum: ServiceGallerySumAggregateOutputType | null
    _min: ServiceGalleryMinAggregateOutputType | null
    _max: ServiceGalleryMaxAggregateOutputType | null
  }

  type GetServiceGalleryGroupByPayload<T extends ServiceGalleryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGalleryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGalleryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGalleryGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGalleryGroupByOutputType[P]>
        }
      >
    >


  export type ServiceGallerySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    image?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["serviceGallery"]>

  export type ServiceGallerySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    image?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["serviceGallery"]>

  export type ServiceGallerySelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    image?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $ServiceGalleryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceGallery"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      image: string
      order: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["serviceGallery"]>
    composites: {}
  }

  type ServiceGalleryGetPayload<S extends boolean | null | undefined | ServiceGalleryDefaultArgs> = $Result.GetResult<Prisma.$ServiceGalleryPayload, S>

  type ServiceGalleryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ServiceGalleryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ServiceGalleryCountAggregateInputType | true
    }

  export interface ServiceGalleryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceGallery'], meta: { name: 'ServiceGallery' } }
    /**
     * Find zero or one ServiceGallery that matches the filter.
     * @param {ServiceGalleryFindUniqueArgs} args - Arguments to find a ServiceGallery
     * @example
     * // Get one ServiceGallery
     * const serviceGallery = await prisma.serviceGallery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceGalleryFindUniqueArgs>(args: SelectSubset<T, ServiceGalleryFindUniqueArgs<ExtArgs>>): Prisma__ServiceGalleryClient<$Result.GetResult<Prisma.$ServiceGalleryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ServiceGallery that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ServiceGalleryFindUniqueOrThrowArgs} args - Arguments to find a ServiceGallery
     * @example
     * // Get one ServiceGallery
     * const serviceGallery = await prisma.serviceGallery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceGalleryFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceGalleryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceGalleryClient<$Result.GetResult<Prisma.$ServiceGalleryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ServiceGallery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGalleryFindFirstArgs} args - Arguments to find a ServiceGallery
     * @example
     * // Get one ServiceGallery
     * const serviceGallery = await prisma.serviceGallery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceGalleryFindFirstArgs>(args?: SelectSubset<T, ServiceGalleryFindFirstArgs<ExtArgs>>): Prisma__ServiceGalleryClient<$Result.GetResult<Prisma.$ServiceGalleryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ServiceGallery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGalleryFindFirstOrThrowArgs} args - Arguments to find a ServiceGallery
     * @example
     * // Get one ServiceGallery
     * const serviceGallery = await prisma.serviceGallery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceGalleryFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceGalleryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceGalleryClient<$Result.GetResult<Prisma.$ServiceGalleryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ServiceGalleries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGalleryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceGalleries
     * const serviceGalleries = await prisma.serviceGallery.findMany()
     * 
     * // Get first 10 ServiceGalleries
     * const serviceGalleries = await prisma.serviceGallery.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceGalleryWithIdOnly = await prisma.serviceGallery.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceGalleryFindManyArgs>(args?: SelectSubset<T, ServiceGalleryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceGalleryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ServiceGallery.
     * @param {ServiceGalleryCreateArgs} args - Arguments to create a ServiceGallery.
     * @example
     * // Create one ServiceGallery
     * const ServiceGallery = await prisma.serviceGallery.create({
     *   data: {
     *     // ... data to create a ServiceGallery
     *   }
     * })
     * 
     */
    create<T extends ServiceGalleryCreateArgs>(args: SelectSubset<T, ServiceGalleryCreateArgs<ExtArgs>>): Prisma__ServiceGalleryClient<$Result.GetResult<Prisma.$ServiceGalleryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ServiceGalleries.
     * @param {ServiceGalleryCreateManyArgs} args - Arguments to create many ServiceGalleries.
     * @example
     * // Create many ServiceGalleries
     * const serviceGallery = await prisma.serviceGallery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceGalleryCreateManyArgs>(args?: SelectSubset<T, ServiceGalleryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceGalleries and returns the data saved in the database.
     * @param {ServiceGalleryCreateManyAndReturnArgs} args - Arguments to create many ServiceGalleries.
     * @example
     * // Create many ServiceGalleries
     * const serviceGallery = await prisma.serviceGallery.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceGalleries and only return the `id`
     * const serviceGalleryWithIdOnly = await prisma.serviceGallery.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceGalleryCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceGalleryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceGalleryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ServiceGallery.
     * @param {ServiceGalleryDeleteArgs} args - Arguments to delete one ServiceGallery.
     * @example
     * // Delete one ServiceGallery
     * const ServiceGallery = await prisma.serviceGallery.delete({
     *   where: {
     *     // ... filter to delete one ServiceGallery
     *   }
     * })
     * 
     */
    delete<T extends ServiceGalleryDeleteArgs>(args: SelectSubset<T, ServiceGalleryDeleteArgs<ExtArgs>>): Prisma__ServiceGalleryClient<$Result.GetResult<Prisma.$ServiceGalleryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ServiceGallery.
     * @param {ServiceGalleryUpdateArgs} args - Arguments to update one ServiceGallery.
     * @example
     * // Update one ServiceGallery
     * const serviceGallery = await prisma.serviceGallery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceGalleryUpdateArgs>(args: SelectSubset<T, ServiceGalleryUpdateArgs<ExtArgs>>): Prisma__ServiceGalleryClient<$Result.GetResult<Prisma.$ServiceGalleryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ServiceGalleries.
     * @param {ServiceGalleryDeleteManyArgs} args - Arguments to filter ServiceGalleries to delete.
     * @example
     * // Delete a few ServiceGalleries
     * const { count } = await prisma.serviceGallery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceGalleryDeleteManyArgs>(args?: SelectSubset<T, ServiceGalleryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceGalleries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGalleryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceGalleries
     * const serviceGallery = await prisma.serviceGallery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceGalleryUpdateManyArgs>(args: SelectSubset<T, ServiceGalleryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ServiceGallery.
     * @param {ServiceGalleryUpsertArgs} args - Arguments to update or create a ServiceGallery.
     * @example
     * // Update or create a ServiceGallery
     * const serviceGallery = await prisma.serviceGallery.upsert({
     *   create: {
     *     // ... data to create a ServiceGallery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceGallery we want to update
     *   }
     * })
     */
    upsert<T extends ServiceGalleryUpsertArgs>(args: SelectSubset<T, ServiceGalleryUpsertArgs<ExtArgs>>): Prisma__ServiceGalleryClient<$Result.GetResult<Prisma.$ServiceGalleryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ServiceGalleries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGalleryCountArgs} args - Arguments to filter ServiceGalleries to count.
     * @example
     * // Count the number of ServiceGalleries
     * const count = await prisma.serviceGallery.count({
     *   where: {
     *     // ... the filter for the ServiceGalleries we want to count
     *   }
     * })
    **/
    count<T extends ServiceGalleryCountArgs>(
      args?: Subset<T, ServiceGalleryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceGalleryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceGallery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGalleryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceGalleryAggregateArgs>(args: Subset<T, ServiceGalleryAggregateArgs>): Prisma.PrismaPromise<GetServiceGalleryAggregateType<T>>

    /**
     * Group by ServiceGallery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGalleryGroupByArgs} args - Group by arguments.
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
      T extends ServiceGalleryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGalleryGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGalleryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceGalleryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGalleryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceGallery model
   */
  readonly fields: ServiceGalleryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceGallery.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceGalleryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ServiceGallery model
   */ 
  interface ServiceGalleryFieldRefs {
    readonly id: FieldRef<"ServiceGallery", 'String'>
    readonly title: FieldRef<"ServiceGallery", 'String'>
    readonly description: FieldRef<"ServiceGallery", 'String'>
    readonly image: FieldRef<"ServiceGallery", 'String'>
    readonly order: FieldRef<"ServiceGallery", 'Int'>
    readonly createdAt: FieldRef<"ServiceGallery", 'DateTime'>
    readonly updatedAt: FieldRef<"ServiceGallery", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceGallery findUnique
   */
  export type ServiceGalleryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceGallery
     */
    select?: ServiceGallerySelect<ExtArgs> | null
    /**
     * Filter, which ServiceGallery to fetch.
     */
    where: ServiceGalleryWhereUniqueInput
  }

  /**
   * ServiceGallery findUniqueOrThrow
   */
  export type ServiceGalleryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceGallery
     */
    select?: ServiceGallerySelect<ExtArgs> | null
    /**
     * Filter, which ServiceGallery to fetch.
     */
    where: ServiceGalleryWhereUniqueInput
  }

  /**
   * ServiceGallery findFirst
   */
  export type ServiceGalleryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceGallery
     */
    select?: ServiceGallerySelect<ExtArgs> | null
    /**
     * Filter, which ServiceGallery to fetch.
     */
    where?: ServiceGalleryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceGalleries to fetch.
     */
    orderBy?: ServiceGalleryOrderByWithRelationInput | ServiceGalleryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceGalleries.
     */
    cursor?: ServiceGalleryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceGalleries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceGalleries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceGalleries.
     */
    distinct?: ServiceGalleryScalarFieldEnum | ServiceGalleryScalarFieldEnum[]
  }

  /**
   * ServiceGallery findFirstOrThrow
   */
  export type ServiceGalleryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceGallery
     */
    select?: ServiceGallerySelect<ExtArgs> | null
    /**
     * Filter, which ServiceGallery to fetch.
     */
    where?: ServiceGalleryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceGalleries to fetch.
     */
    orderBy?: ServiceGalleryOrderByWithRelationInput | ServiceGalleryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceGalleries.
     */
    cursor?: ServiceGalleryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceGalleries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceGalleries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceGalleries.
     */
    distinct?: ServiceGalleryScalarFieldEnum | ServiceGalleryScalarFieldEnum[]
  }

  /**
   * ServiceGallery findMany
   */
  export type ServiceGalleryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceGallery
     */
    select?: ServiceGallerySelect<ExtArgs> | null
    /**
     * Filter, which ServiceGalleries to fetch.
     */
    where?: ServiceGalleryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceGalleries to fetch.
     */
    orderBy?: ServiceGalleryOrderByWithRelationInput | ServiceGalleryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceGalleries.
     */
    cursor?: ServiceGalleryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceGalleries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceGalleries.
     */
    skip?: number
    distinct?: ServiceGalleryScalarFieldEnum | ServiceGalleryScalarFieldEnum[]
  }

  /**
   * ServiceGallery create
   */
  export type ServiceGalleryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceGallery
     */
    select?: ServiceGallerySelect<ExtArgs> | null
    /**
     * The data needed to create a ServiceGallery.
     */
    data: XOR<ServiceGalleryCreateInput, ServiceGalleryUncheckedCreateInput>
  }

  /**
   * ServiceGallery createMany
   */
  export type ServiceGalleryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceGalleries.
     */
    data: ServiceGalleryCreateManyInput | ServiceGalleryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceGallery createManyAndReturn
   */
  export type ServiceGalleryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceGallery
     */
    select?: ServiceGallerySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ServiceGalleries.
     */
    data: ServiceGalleryCreateManyInput | ServiceGalleryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceGallery update
   */
  export type ServiceGalleryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceGallery
     */
    select?: ServiceGallerySelect<ExtArgs> | null
    /**
     * The data needed to update a ServiceGallery.
     */
    data: XOR<ServiceGalleryUpdateInput, ServiceGalleryUncheckedUpdateInput>
    /**
     * Choose, which ServiceGallery to update.
     */
    where: ServiceGalleryWhereUniqueInput
  }

  /**
   * ServiceGallery updateMany
   */
  export type ServiceGalleryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceGalleries.
     */
    data: XOR<ServiceGalleryUpdateManyMutationInput, ServiceGalleryUncheckedUpdateManyInput>
    /**
     * Filter which ServiceGalleries to update
     */
    where?: ServiceGalleryWhereInput
  }

  /**
   * ServiceGallery upsert
   */
  export type ServiceGalleryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceGallery
     */
    select?: ServiceGallerySelect<ExtArgs> | null
    /**
     * The filter to search for the ServiceGallery to update in case it exists.
     */
    where: ServiceGalleryWhereUniqueInput
    /**
     * In case the ServiceGallery found by the `where` argument doesn't exist, create a new ServiceGallery with this data.
     */
    create: XOR<ServiceGalleryCreateInput, ServiceGalleryUncheckedCreateInput>
    /**
     * In case the ServiceGallery was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceGalleryUpdateInput, ServiceGalleryUncheckedUpdateInput>
  }

  /**
   * ServiceGallery delete
   */
  export type ServiceGalleryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceGallery
     */
    select?: ServiceGallerySelect<ExtArgs> | null
    /**
     * Filter which ServiceGallery to delete.
     */
    where: ServiceGalleryWhereUniqueInput
  }

  /**
   * ServiceGallery deleteMany
   */
  export type ServiceGalleryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceGalleries to delete
     */
    where?: ServiceGalleryWhereInput
  }

  /**
   * ServiceGallery without action
   */
  export type ServiceGalleryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceGallery
     */
    select?: ServiceGallerySelect<ExtArgs> | null
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


  export const PostScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    title: 'title',
    content: 'content',
    category: 'category',
    date: 'date',
    author: 'author',
    tags: 'tags',
    images: 'images',
    hoverText: 'hoverText',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const MenuScalarFieldEnum: {
    id: 'id',
    name: 'name',
    nameEn: 'nameEn',
    description: 'description',
    category: 'category',
    categorySlug: 'categorySlug',
    tags: 'tags',
    isPopular: 'isPopular',
    spicyLevel: 'spicyLevel',
    isNew: 'isNew',
    isVegetarian: 'isVegetarian',
    allergens: 'allergens',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MenuScalarFieldEnum = (typeof MenuScalarFieldEnum)[keyof typeof MenuScalarFieldEnum]


  export const EstimateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    email: 'email',
    service: 'service',
    date: 'date',
    location: 'location',
    attendees: 'attendees',
    details: 'details',
    adminNotes: 'adminNotes',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EstimateScalarFieldEnum = (typeof EstimateScalarFieldEnum)[keyof typeof EstimateScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    name: 'name',
    business: 'business',
    rating: 'rating',
    content: 'content',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const ServiceGalleryScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    image: 'image',
    order: 'order',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceGalleryScalarFieldEnum = (typeof ServiceGalleryScalarFieldEnum)[keyof typeof ServiceGalleryScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'MenuCategory'
   */
  export type EnumMenuCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MenuCategory'>
    


  /**
   * Reference to a field of type 'MenuCategory[]'
   */
  export type ListEnumMenuCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MenuCategory[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'EstimateStatus'
   */
  export type EnumEstimateStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstimateStatus'>
    


  /**
   * Reference to a field of type 'EstimateStatus[]'
   */
  export type ListEnumEstimateStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstimateStatus[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


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


  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: StringFilter<"Post"> | string
    slug?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    content?: StringFilter<"Post"> | string
    category?: StringFilter<"Post"> | string
    date?: DateTimeFilter<"Post"> | Date | string
    author?: StringFilter<"Post"> | string
    tags?: StringNullableListFilter<"Post">
    images?: StringNullableListFilter<"Post">
    hoverText?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    date?: SortOrder
    author?: SortOrder
    tags?: SortOrder
    images?: SortOrder
    hoverText?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    title?: StringFilter<"Post"> | string
    content?: StringFilter<"Post"> | string
    category?: StringFilter<"Post"> | string
    date?: DateTimeFilter<"Post"> | Date | string
    author?: StringFilter<"Post"> | string
    tags?: StringNullableListFilter<"Post">
    images?: StringNullableListFilter<"Post">
    hoverText?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
  }, "id" | "slug">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    date?: SortOrder
    author?: SortOrder
    tags?: SortOrder
    images?: SortOrder
    hoverText?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Post"> | string
    slug?: StringWithAggregatesFilter<"Post"> | string
    title?: StringWithAggregatesFilter<"Post"> | string
    content?: StringWithAggregatesFilter<"Post"> | string
    category?: StringWithAggregatesFilter<"Post"> | string
    date?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    author?: StringWithAggregatesFilter<"Post"> | string
    tags?: StringNullableListFilter<"Post">
    images?: StringNullableListFilter<"Post">
    hoverText?: StringNullableWithAggregatesFilter<"Post"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
  }

  export type MenuWhereInput = {
    AND?: MenuWhereInput | MenuWhereInput[]
    OR?: MenuWhereInput[]
    NOT?: MenuWhereInput | MenuWhereInput[]
    id?: StringFilter<"Menu"> | string
    name?: StringFilter<"Menu"> | string
    nameEn?: StringNullableFilter<"Menu"> | string | null
    description?: StringFilter<"Menu"> | string
    category?: EnumMenuCategoryFilter<"Menu"> | $Enums.MenuCategory
    categorySlug?: StringFilter<"Menu"> | string
    tags?: StringNullableListFilter<"Menu">
    isPopular?: BoolFilter<"Menu"> | boolean
    spicyLevel?: IntNullableFilter<"Menu"> | number | null
    isNew?: BoolFilter<"Menu"> | boolean
    isVegetarian?: BoolFilter<"Menu"> | boolean
    allergens?: StringNullableListFilter<"Menu">
    image?: StringFilter<"Menu"> | string
    createdAt?: DateTimeFilter<"Menu"> | Date | string
    updatedAt?: DateTimeFilter<"Menu"> | Date | string
  }

  export type MenuOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrderInput | SortOrder
    description?: SortOrder
    category?: SortOrder
    categorySlug?: SortOrder
    tags?: SortOrder
    isPopular?: SortOrder
    spicyLevel?: SortOrderInput | SortOrder
    isNew?: SortOrder
    isVegetarian?: SortOrder
    allergens?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenuWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MenuWhereInput | MenuWhereInput[]
    OR?: MenuWhereInput[]
    NOT?: MenuWhereInput | MenuWhereInput[]
    name?: StringFilter<"Menu"> | string
    nameEn?: StringNullableFilter<"Menu"> | string | null
    description?: StringFilter<"Menu"> | string
    category?: EnumMenuCategoryFilter<"Menu"> | $Enums.MenuCategory
    categorySlug?: StringFilter<"Menu"> | string
    tags?: StringNullableListFilter<"Menu">
    isPopular?: BoolFilter<"Menu"> | boolean
    spicyLevel?: IntNullableFilter<"Menu"> | number | null
    isNew?: BoolFilter<"Menu"> | boolean
    isVegetarian?: BoolFilter<"Menu"> | boolean
    allergens?: StringNullableListFilter<"Menu">
    image?: StringFilter<"Menu"> | string
    createdAt?: DateTimeFilter<"Menu"> | Date | string
    updatedAt?: DateTimeFilter<"Menu"> | Date | string
  }, "id">

  export type MenuOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrderInput | SortOrder
    description?: SortOrder
    category?: SortOrder
    categorySlug?: SortOrder
    tags?: SortOrder
    isPopular?: SortOrder
    spicyLevel?: SortOrderInput | SortOrder
    isNew?: SortOrder
    isVegetarian?: SortOrder
    allergens?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MenuCountOrderByAggregateInput
    _avg?: MenuAvgOrderByAggregateInput
    _max?: MenuMaxOrderByAggregateInput
    _min?: MenuMinOrderByAggregateInput
    _sum?: MenuSumOrderByAggregateInput
  }

  export type MenuScalarWhereWithAggregatesInput = {
    AND?: MenuScalarWhereWithAggregatesInput | MenuScalarWhereWithAggregatesInput[]
    OR?: MenuScalarWhereWithAggregatesInput[]
    NOT?: MenuScalarWhereWithAggregatesInput | MenuScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Menu"> | string
    name?: StringWithAggregatesFilter<"Menu"> | string
    nameEn?: StringNullableWithAggregatesFilter<"Menu"> | string | null
    description?: StringWithAggregatesFilter<"Menu"> | string
    category?: EnumMenuCategoryWithAggregatesFilter<"Menu"> | $Enums.MenuCategory
    categorySlug?: StringWithAggregatesFilter<"Menu"> | string
    tags?: StringNullableListFilter<"Menu">
    isPopular?: BoolWithAggregatesFilter<"Menu"> | boolean
    spicyLevel?: IntNullableWithAggregatesFilter<"Menu"> | number | null
    isNew?: BoolWithAggregatesFilter<"Menu"> | boolean
    isVegetarian?: BoolWithAggregatesFilter<"Menu"> | boolean
    allergens?: StringNullableListFilter<"Menu">
    image?: StringWithAggregatesFilter<"Menu"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Menu"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Menu"> | Date | string
  }

  export type EstimateWhereInput = {
    AND?: EstimateWhereInput | EstimateWhereInput[]
    OR?: EstimateWhereInput[]
    NOT?: EstimateWhereInput | EstimateWhereInput[]
    id?: StringFilter<"Estimate"> | string
    name?: StringFilter<"Estimate"> | string
    phone?: StringFilter<"Estimate"> | string
    email?: StringNullableFilter<"Estimate"> | string | null
    service?: StringFilter<"Estimate"> | string
    date?: DateTimeFilter<"Estimate"> | Date | string
    location?: StringFilter<"Estimate"> | string
    attendees?: IntFilter<"Estimate"> | number
    details?: StringNullableFilter<"Estimate"> | string | null
    adminNotes?: StringNullableFilter<"Estimate"> | string | null
    status?: EnumEstimateStatusFilter<"Estimate"> | $Enums.EstimateStatus
    createdAt?: DateTimeFilter<"Estimate"> | Date | string
    updatedAt?: DateTimeFilter<"Estimate"> | Date | string
  }

  export type EstimateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    service?: SortOrder
    date?: SortOrder
    location?: SortOrder
    attendees?: SortOrder
    details?: SortOrderInput | SortOrder
    adminNotes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EstimateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EstimateWhereInput | EstimateWhereInput[]
    OR?: EstimateWhereInput[]
    NOT?: EstimateWhereInput | EstimateWhereInput[]
    name?: StringFilter<"Estimate"> | string
    phone?: StringFilter<"Estimate"> | string
    email?: StringNullableFilter<"Estimate"> | string | null
    service?: StringFilter<"Estimate"> | string
    date?: DateTimeFilter<"Estimate"> | Date | string
    location?: StringFilter<"Estimate"> | string
    attendees?: IntFilter<"Estimate"> | number
    details?: StringNullableFilter<"Estimate"> | string | null
    adminNotes?: StringNullableFilter<"Estimate"> | string | null
    status?: EnumEstimateStatusFilter<"Estimate"> | $Enums.EstimateStatus
    createdAt?: DateTimeFilter<"Estimate"> | Date | string
    updatedAt?: DateTimeFilter<"Estimate"> | Date | string
  }, "id">

  export type EstimateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    service?: SortOrder
    date?: SortOrder
    location?: SortOrder
    attendees?: SortOrder
    details?: SortOrderInput | SortOrder
    adminNotes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EstimateCountOrderByAggregateInput
    _avg?: EstimateAvgOrderByAggregateInput
    _max?: EstimateMaxOrderByAggregateInput
    _min?: EstimateMinOrderByAggregateInput
    _sum?: EstimateSumOrderByAggregateInput
  }

  export type EstimateScalarWhereWithAggregatesInput = {
    AND?: EstimateScalarWhereWithAggregatesInput | EstimateScalarWhereWithAggregatesInput[]
    OR?: EstimateScalarWhereWithAggregatesInput[]
    NOT?: EstimateScalarWhereWithAggregatesInput | EstimateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Estimate"> | string
    name?: StringWithAggregatesFilter<"Estimate"> | string
    phone?: StringWithAggregatesFilter<"Estimate"> | string
    email?: StringNullableWithAggregatesFilter<"Estimate"> | string | null
    service?: StringWithAggregatesFilter<"Estimate"> | string
    date?: DateTimeWithAggregatesFilter<"Estimate"> | Date | string
    location?: StringWithAggregatesFilter<"Estimate"> | string
    attendees?: IntWithAggregatesFilter<"Estimate"> | number
    details?: StringNullableWithAggregatesFilter<"Estimate"> | string | null
    adminNotes?: StringNullableWithAggregatesFilter<"Estimate"> | string | null
    status?: EnumEstimateStatusWithAggregatesFilter<"Estimate"> | $Enums.EstimateStatus
    createdAt?: DateTimeWithAggregatesFilter<"Estimate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Estimate"> | Date | string
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    name?: StringFilter<"Review"> | string
    business?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    content?: StringFilter<"Review"> | string
    image?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    business?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    name?: StringFilter<"Review"> | string
    business?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    content?: StringFilter<"Review"> | string
    image?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
  }, "id">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    business?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    name?: StringWithAggregatesFilter<"Review"> | string
    business?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    content?: StringWithAggregatesFilter<"Review"> | string
    image?: StringNullableWithAggregatesFilter<"Review"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: StringFilter<"Admin"> | string
    email?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    name?: StringFilter<"Admin"> | string
    role?: EnumRoleFilter<"Admin"> | $Enums.Role
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    password?: StringFilter<"Admin"> | string
    name?: StringFilter<"Admin"> | string
    role?: EnumRoleFilter<"Admin"> | $Enums.Role
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
  }, "id" | "email">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Admin"> | string
    email?: StringWithAggregatesFilter<"Admin"> | string
    password?: StringWithAggregatesFilter<"Admin"> | string
    name?: StringWithAggregatesFilter<"Admin"> | string
    role?: EnumRoleWithAggregatesFilter<"Admin"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
  }

  export type ServiceGalleryWhereInput = {
    AND?: ServiceGalleryWhereInput | ServiceGalleryWhereInput[]
    OR?: ServiceGalleryWhereInput[]
    NOT?: ServiceGalleryWhereInput | ServiceGalleryWhereInput[]
    id?: StringFilter<"ServiceGallery"> | string
    title?: StringFilter<"ServiceGallery"> | string
    description?: StringFilter<"ServiceGallery"> | string
    image?: StringFilter<"ServiceGallery"> | string
    order?: IntFilter<"ServiceGallery"> | number
    createdAt?: DateTimeFilter<"ServiceGallery"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceGallery"> | Date | string
  }

  export type ServiceGalleryOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceGalleryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceGalleryWhereInput | ServiceGalleryWhereInput[]
    OR?: ServiceGalleryWhereInput[]
    NOT?: ServiceGalleryWhereInput | ServiceGalleryWhereInput[]
    title?: StringFilter<"ServiceGallery"> | string
    description?: StringFilter<"ServiceGallery"> | string
    image?: StringFilter<"ServiceGallery"> | string
    order?: IntFilter<"ServiceGallery"> | number
    createdAt?: DateTimeFilter<"ServiceGallery"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceGallery"> | Date | string
  }, "id">

  export type ServiceGalleryOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceGalleryCountOrderByAggregateInput
    _avg?: ServiceGalleryAvgOrderByAggregateInput
    _max?: ServiceGalleryMaxOrderByAggregateInput
    _min?: ServiceGalleryMinOrderByAggregateInput
    _sum?: ServiceGallerySumOrderByAggregateInput
  }

  export type ServiceGalleryScalarWhereWithAggregatesInput = {
    AND?: ServiceGalleryScalarWhereWithAggregatesInput | ServiceGalleryScalarWhereWithAggregatesInput[]
    OR?: ServiceGalleryScalarWhereWithAggregatesInput[]
    NOT?: ServiceGalleryScalarWhereWithAggregatesInput | ServiceGalleryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceGallery"> | string
    title?: StringWithAggregatesFilter<"ServiceGallery"> | string
    description?: StringWithAggregatesFilter<"ServiceGallery"> | string
    image?: StringWithAggregatesFilter<"ServiceGallery"> | string
    order?: IntWithAggregatesFilter<"ServiceGallery"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ServiceGallery"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServiceGallery"> | Date | string
  }

  export type PostCreateInput = {
    id?: string
    slug: string
    title: string
    content: string
    category: string
    date: Date | string
    author: string
    tags?: PostCreatetagsInput | string[]
    images?: PostCreateimagesInput | string[]
    hoverText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUncheckedCreateInput = {
    id?: string
    slug: string
    title: string
    content: string
    category: string
    date: Date | string
    author: string
    tags?: PostCreatetagsInput | string[]
    images?: PostCreateimagesInput | string[]
    hoverText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: StringFieldUpdateOperationsInput | string
    tags?: PostUpdatetagsInput | string[]
    images?: PostUpdateimagesInput | string[]
    hoverText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: StringFieldUpdateOperationsInput | string
    tags?: PostUpdatetagsInput | string[]
    images?: PostUpdateimagesInput | string[]
    hoverText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateManyInput = {
    id?: string
    slug: string
    title: string
    content: string
    category: string
    date: Date | string
    author: string
    tags?: PostCreatetagsInput | string[]
    images?: PostCreateimagesInput | string[]
    hoverText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: StringFieldUpdateOperationsInput | string
    tags?: PostUpdatetagsInput | string[]
    images?: PostUpdateimagesInput | string[]
    hoverText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: StringFieldUpdateOperationsInput | string
    tags?: PostUpdatetagsInput | string[]
    images?: PostUpdateimagesInput | string[]
    hoverText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuCreateInput = {
    id?: string
    name: string
    nameEn?: string | null
    description: string
    category: $Enums.MenuCategory
    categorySlug: string
    tags?: MenuCreatetagsInput | string[]
    isPopular?: boolean
    spicyLevel?: number | null
    isNew?: boolean
    isVegetarian?: boolean
    allergens?: MenuCreateallergensInput | string[]
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenuUncheckedCreateInput = {
    id?: string
    name: string
    nameEn?: string | null
    description: string
    category: $Enums.MenuCategory
    categorySlug: string
    tags?: MenuCreatetagsInput | string[]
    isPopular?: boolean
    spicyLevel?: number | null
    isNew?: boolean
    isVegetarian?: boolean
    allergens?: MenuCreateallergensInput | string[]
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenuUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumMenuCategoryFieldUpdateOperationsInput | $Enums.MenuCategory
    categorySlug?: StringFieldUpdateOperationsInput | string
    tags?: MenuUpdatetagsInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    spicyLevel?: NullableIntFieldUpdateOperationsInput | number | null
    isNew?: BoolFieldUpdateOperationsInput | boolean
    isVegetarian?: BoolFieldUpdateOperationsInput | boolean
    allergens?: MenuUpdateallergensInput | string[]
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumMenuCategoryFieldUpdateOperationsInput | $Enums.MenuCategory
    categorySlug?: StringFieldUpdateOperationsInput | string
    tags?: MenuUpdatetagsInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    spicyLevel?: NullableIntFieldUpdateOperationsInput | number | null
    isNew?: BoolFieldUpdateOperationsInput | boolean
    isVegetarian?: BoolFieldUpdateOperationsInput | boolean
    allergens?: MenuUpdateallergensInput | string[]
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuCreateManyInput = {
    id?: string
    name: string
    nameEn?: string | null
    description: string
    category: $Enums.MenuCategory
    categorySlug: string
    tags?: MenuCreatetagsInput | string[]
    isPopular?: boolean
    spicyLevel?: number | null
    isNew?: boolean
    isVegetarian?: boolean
    allergens?: MenuCreateallergensInput | string[]
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenuUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumMenuCategoryFieldUpdateOperationsInput | $Enums.MenuCategory
    categorySlug?: StringFieldUpdateOperationsInput | string
    tags?: MenuUpdatetagsInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    spicyLevel?: NullableIntFieldUpdateOperationsInput | number | null
    isNew?: BoolFieldUpdateOperationsInput | boolean
    isVegetarian?: BoolFieldUpdateOperationsInput | boolean
    allergens?: MenuUpdateallergensInput | string[]
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumMenuCategoryFieldUpdateOperationsInput | $Enums.MenuCategory
    categorySlug?: StringFieldUpdateOperationsInput | string
    tags?: MenuUpdatetagsInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    spicyLevel?: NullableIntFieldUpdateOperationsInput | number | null
    isNew?: BoolFieldUpdateOperationsInput | boolean
    isVegetarian?: BoolFieldUpdateOperationsInput | boolean
    allergens?: MenuUpdateallergensInput | string[]
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstimateCreateInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    service: string
    date: Date | string
    location: string
    attendees: number
    details?: string | null
    adminNotes?: string | null
    status?: $Enums.EstimateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EstimateUncheckedCreateInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    service: string
    date: Date | string
    location: string
    attendees: number
    details?: string | null
    adminNotes?: string | null
    status?: $Enums.EstimateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EstimateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    attendees?: IntFieldUpdateOperationsInput | number
    details?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstimateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    attendees?: IntFieldUpdateOperationsInput | number
    details?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstimateCreateManyInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    service: string
    date: Date | string
    location: string
    attendees: number
    details?: string | null
    adminNotes?: string | null
    status?: $Enums.EstimateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EstimateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    attendees?: IntFieldUpdateOperationsInput | number
    details?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstimateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    service?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    attendees?: IntFieldUpdateOperationsInput | number
    details?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEstimateStatusFieldUpdateOperationsInput | $Enums.EstimateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateInput = {
    id?: string
    name: string
    business: string
    rating: number
    content: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    name: string
    business: string
    rating: number
    content: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    business?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    business?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    name: string
    business: string
    rating: number
    content: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    business?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    business?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceGalleryCreateInput = {
    id?: string
    title: string
    description: string
    image: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceGalleryUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    image: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceGalleryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceGalleryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceGalleryCreateManyInput = {
    id?: string
    title: string
    description: string
    image: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceGalleryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceGalleryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    date?: SortOrder
    author?: SortOrder
    tags?: SortOrder
    images?: SortOrder
    hoverText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    date?: SortOrder
    author?: SortOrder
    hoverText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    date?: SortOrder
    author?: SortOrder
    hoverText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumMenuCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.MenuCategory | EnumMenuCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.MenuCategory[] | ListEnumMenuCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.MenuCategory[] | ListEnumMenuCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumMenuCategoryFilter<$PrismaModel> | $Enums.MenuCategory
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MenuCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    description?: SortOrder
    category?: SortOrder
    categorySlug?: SortOrder
    tags?: SortOrder
    isPopular?: SortOrder
    spicyLevel?: SortOrder
    isNew?: SortOrder
    isVegetarian?: SortOrder
    allergens?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenuAvgOrderByAggregateInput = {
    spicyLevel?: SortOrder
  }

  export type MenuMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    description?: SortOrder
    category?: SortOrder
    categorySlug?: SortOrder
    isPopular?: SortOrder
    spicyLevel?: SortOrder
    isNew?: SortOrder
    isVegetarian?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenuMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    description?: SortOrder
    category?: SortOrder
    categorySlug?: SortOrder
    isPopular?: SortOrder
    spicyLevel?: SortOrder
    isNew?: SortOrder
    isVegetarian?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenuSumOrderByAggregateInput = {
    spicyLevel?: SortOrder
  }

  export type EnumMenuCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MenuCategory | EnumMenuCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.MenuCategory[] | ListEnumMenuCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.MenuCategory[] | ListEnumMenuCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumMenuCategoryWithAggregatesFilter<$PrismaModel> | $Enums.MenuCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMenuCategoryFilter<$PrismaModel>
    _max?: NestedEnumMenuCategoryFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type EnumEstimateStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EstimateStatus | EnumEstimateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEstimateStatusFilter<$PrismaModel> | $Enums.EstimateStatus
  }

  export type EstimateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    service?: SortOrder
    date?: SortOrder
    location?: SortOrder
    attendees?: SortOrder
    details?: SortOrder
    adminNotes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EstimateAvgOrderByAggregateInput = {
    attendees?: SortOrder
  }

  export type EstimateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    service?: SortOrder
    date?: SortOrder
    location?: SortOrder
    attendees?: SortOrder
    details?: SortOrder
    adminNotes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EstimateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    service?: SortOrder
    date?: SortOrder
    location?: SortOrder
    attendees?: SortOrder
    details?: SortOrder
    adminNotes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EstimateSumOrderByAggregateInput = {
    attendees?: SortOrder
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

  export type EnumEstimateStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstimateStatus | EnumEstimateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEstimateStatusWithAggregatesFilter<$PrismaModel> | $Enums.EstimateStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstimateStatusFilter<$PrismaModel>
    _max?: NestedEnumEstimateStatusFilter<$PrismaModel>
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    business?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    business?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    business?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type ServiceGalleryCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceGalleryAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ServiceGalleryMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceGalleryMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceGallerySumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type PostCreatetagsInput = {
    set: string[]
  }

  export type PostCreateimagesInput = {
    set: string[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PostUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PostUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type MenuCreatetagsInput = {
    set: string[]
  }

  export type MenuCreateallergensInput = {
    set: string[]
  }

  export type EnumMenuCategoryFieldUpdateOperationsInput = {
    set?: $Enums.MenuCategory
  }

  export type MenuUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MenuUpdateallergensInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumEstimateStatusFieldUpdateOperationsInput = {
    set?: $Enums.EstimateStatus
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
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

  export type NestedEnumMenuCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.MenuCategory | EnumMenuCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.MenuCategory[] | ListEnumMenuCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.MenuCategory[] | ListEnumMenuCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumMenuCategoryFilter<$PrismaModel> | $Enums.MenuCategory
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumMenuCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MenuCategory | EnumMenuCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.MenuCategory[] | ListEnumMenuCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.MenuCategory[] | ListEnumMenuCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumMenuCategoryWithAggregatesFilter<$PrismaModel> | $Enums.MenuCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMenuCategoryFilter<$PrismaModel>
    _max?: NestedEnumMenuCategoryFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumEstimateStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EstimateStatus | EnumEstimateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEstimateStatusFilter<$PrismaModel> | $Enums.EstimateStatus
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

  export type NestedEnumEstimateStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstimateStatus | EnumEstimateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstimateStatus[] | ListEnumEstimateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEstimateStatusWithAggregatesFilter<$PrismaModel> | $Enums.EstimateStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstimateStatusFilter<$PrismaModel>
    _max?: NestedEnumEstimateStatusFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PostDefaultArgs instead
     */
    export type PostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PostDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MenuDefaultArgs instead
     */
    export type MenuArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MenuDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EstimateDefaultArgs instead
     */
    export type EstimateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EstimateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReviewDefaultArgs instead
     */
    export type ReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReviewDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AdminDefaultArgs instead
     */
    export type AdminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceGalleryDefaultArgs instead
     */
    export type ServiceGalleryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceGalleryDefaultArgs<ExtArgs>

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