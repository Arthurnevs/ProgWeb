export class ValidationService {

    static isRequired(value: string | undefined, fieldName: string): string | null {
        if (!value || value.trim() === '') {
            return `${fieldName} is required.`;
        }
        return null;
    }

    static isMinLength(value: string | undefined, fieldName: string, minLength: number): string | null {
        if (value && value.length < minLength) {
            return `${fieldName} must be at least ${minLength} characters long.`;
        }
        return null;
    }

    static isDocumentValid(document: string | undefined): string | null {
        const documentPattern = /^[0-9]{11}$/; // Exemplo: CPF com 11 dígitos
        if (document && !documentPattern.test(document)) {
            return 'Document must be a valid 11-digit number.';
        }
        return null;
    }
}
