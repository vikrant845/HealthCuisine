export interface UserModel {
    firstName: string,
    lastName: string,
    maidenName: string,
    age: number,
    gender: string,
    email: string,
    phone: string,
    username: string,
    password: string,
    passwordConfirm: string,
    passwordChangedAt: Date,
    birthDate: Date,
    image: string,
    bloodGroup: string,
    height: number,
    weight: number,
    ip: string,
    address: {
        address: string,
        city: string,
        coordinates: {
            lat: number,
            lng: number
        },
        postalCode: string,
        state: string
    },
    bank: {
        cardExpires: string,
        cardNumber: string,
        cardType: string,
        currency: string,
        iban: string
    },
    ssn: string,
    active: boolean,
    likedWorkouts: [string],
    ongoingWorkouts: [string],
    goal: number
}