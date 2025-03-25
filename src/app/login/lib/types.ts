/* eslint-disable @typescript-eslint/no-namespace */

export declare namespace IApi {
  export namespace List {
    export interface Response {
      data: Data[];
    }
  }
  export namespace Single {
    export interface Response {
      data: Data;
    }
  }

  export interface Data {
    id: string;
  }
}

export declare namespace IEntity {
  export interface Data {
    id: string;
  }

  export interface Tokens {
    accessToken: string;
    refreshToken: string;
  }

  export interface Meta {
    totalPages: number;
    totalItems: number;
    current: number;
    perPage: number;
  }
}

export declare namespace IQuery {
  export interface List {
    items: IEntity.Data[];
    meta: IEntity.Meta;
  }

  export interface InfiniteList<T> {
    items: T;
    meta: IEntity.Meta;
  }

  export interface Single {
    item: IEntity.Data;
  }

  export interface Close {
    id: string;
  }
}

export declare namespace IForm {
  export interface Create {
    title: {
      uz: string;
      ru: string;
      en: string;
    };
    value: {
      uz: string;
      ru: string;
      en: string;
    };
  }

  export interface Update {
    title: {
      uz: string;
      ru: string;
      en: string;
    };
    value: {
      uz: string;
      ru: string;
      en: string;
    };
  }
}

export interface IParams {
  page?: number;
  perPage?: number;
  sort?: {
    key?: string;
    direction?: "ASC" | "DESC";
  };
  filter?: IFilter[];
}

export interface IFilter {
  key: string;
  operation: ">" | ">=" | "<" | "<=" | "=" | "!=";
  value: string | number | boolean;
}
