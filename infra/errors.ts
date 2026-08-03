type ErrorProps = {
  cause?: unknown;
  message?: string;
  action?: string;
  statusCode?: number;
};

export class InternalServerError extends Error {
  public action: string;
  public statusCode: number;

  constructor(props?: ErrorProps) {
    super("Um erro interno não esperado aconteceu", {
      cause: props?.cause,
    });

    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte.";
    this.statusCode = 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  public action: string;
  public statusCode: number;

  constructor(props?: ErrorProps) {
    super("Método não permitido para este endpoint.", {
      cause: props?.cause,
    });

    this.name = "MethodNotAllowedError";
    this.action =
      "Verifique se o método HTTP enviado é válido para este endpoint.";
    this.statusCode = 405;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ServiceError extends Error {
  public action: string;
  public statusCode: number;

  constructor(props?: ErrorProps) {
    super(props?.message ?? "Serviço indisponível no momento", {
      cause: props?.cause,
    });

    this.name = "ServiceError";
    this.action =
      "Verifique se o serviço está disponível.";
    this.statusCode = props?.statusCode ?? 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
