type SuccessOrError<T, U = unknown> = SuccessResult<T> | ErrorResult<U>;

class SuccessResult<T> {
    public readonly isError = false;

    constructor (private value: T) {}

    public success() {
        return this.value;
    }
}

class ErrorResult<U> {
    public readonly isError = true;

    constructor (private value: U = true as U) {}

    public error() {
        return this.value;
    }
}


// Test function
enum FormError{ "BAD_USERNANME", "BAD_PASSWORD" };

function test(path = false): SuccessOrError<string, FormError> {
    if (path) {
        return new SuccessResult("Happy path!");
    }
    return new ErrorResult(FormError.BAD_USERNANME);
}

const response = test();

if (!response.isError) {
    console.log(`Success: [${response.success()}]`);
} else {
    
    switch (response.error()) {
        case FormError.BAD_PASSWORD:
            console.log(`Error: [Bad Password!]`);
            break;
        case FormError.BAD_USERNANME:
            console.log(`Error: [Bad Username!]`);
            break;
        default:
            console.log(`Error: [Unknown]`);
    }
}
