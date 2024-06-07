type SuccessOrError<T, U = unknown> = SuccessResult<T> | ErrorResult<U>;

type SuccessResult<T> = {
    readonly isError: false;
    readonly success: T;
}

type ErrorResult<U> = {
    readonly isError: true;
    readonly error: U;
}

function isSuccess<T>(success: T): SuccessResult<T> {
    return { success, isError: false };
}

function isError<U>(error: U = undefined as U): ErrorResult<U> {
    return { error, isError: true };
}


// Test function
enum FormError{ "BAD_USERNANME", "BAD_PASSWORD" };

function test(path = true): SuccessOrError<string, FormError> {
    if (path) {
        return isSuccess("Happy path!");
    }
    return isError(FormError.BAD_PASSWORD);
}

const response = test();

if (!response.isError) {
    console.log(`Success: [${response.success}]`);
} else {
    
    switch (response.error) {
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
