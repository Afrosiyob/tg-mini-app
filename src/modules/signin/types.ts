export declare namespace IApi {
  export namespace ConfirmOtp {
    export interface Request {
      verifyCode: string;
      verifyId: string;
    }

    export type Response = {
      accessToken: string;
      refreshToken: string;
    };
  }

  export namespace CheckPhone {
    export interface Request {
      phone: string;
    }

    export type Response = {
      authRequireCellular: {
        key: string;
        type: string;
        value: boolean;
      };
      exists: boolean;
    };
  }

  export namespace GetOtp {
    export interface Request {
      phone: string;
      password: string;
    }

    export type Response = {
      verifyId: string;
      expires: number;
    };
  }
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

export declare namespace IContext {
  export interface State {
    verifyId: string;
    verifyCode: string;
  }

  export interface Methods {
    setValue: (values: any) => void;
    clearValue: () => void;
  }

  export interface Value {
    state: State;
    methods: Methods;
  }
}

export declare namespace IEntity {
  export interface CheckPhone {
    authRequireCellular: {
      key: string;
      type: string;
      value: boolean;
    };
    exists: boolean;
  }

  export interface Tokens {
    accessToken: string;
    refreshToken: string;
  }

  export interface Device {
    token: string;
    deviceOs: string;
    model: string;
    osVersion: string;
    appVersion: string;
  }

  export interface Data {
    id: string;
  }

  export interface GetOtp {
    verifyId: string;
    expires: number;
  }

  export interface ConfirmOtp {
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

export declare namespace Actions {
  export interface Response {
    isError?: boolean;
    isLoading?: boolean;
    isValid?: boolean;
  }

  export interface GetOtp extends Response {
    errors?: {
      phone?: string;
      password?: string;
    };
  }

  export interface ConfirmOtp extends Response {
    errors?: {
      verifyCode?: string[];
    };
  }

  export interface CheckPhone extends Response {
    errors?: {
      phone?: string[];
    };
  }
}

export declare namespace IForm {
  export interface CheckPhone {
    phone: string;
  }

  export interface GetOtp {
    phone: string;
    password: string;
  }

  export interface ConfirmOtp {
    verifyCode: string;
    verifyId: string;
  }
}

export interface IParams {
  page?: number;
  perPage?: number;
  sort?: {
    key?: string;
    direction?: 'ASC' | 'DESC';
  };
  filter?: IFilter[];
}

export interface IFilter {
  key: string;
  operation: '>' | '>=' | '<' | '<=' | '=' | '!=';
  value: string | number | boolean;
}
