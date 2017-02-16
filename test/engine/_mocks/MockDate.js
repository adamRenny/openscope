export function buildMockDate(timestamp) {
    return class MockDate {
        getTime() {
            return timestamp;
        }
    };
}