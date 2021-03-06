import {sleep, request} from './utils'

export const generateAndLogUser = async (page) => {
    await registerUser(page)
    await logUser(page)
}

export const registerUser = async (page) => {
    return await request(page, `http://localhost:3000/auth/local/register`, 'POST', {
        email: 'example@example.com',
        password: 'Somepass01',
    })
}

export const logUser = async (page) => {
    await request(page, `http://localhost:3000/auth/local/login`, 'POST', {
        username: 'example@example.com',
        password: 'Somepass01',
    });
    await request(page, `http://localhost:3000/auth/local/set-username`, 'POST', {
        username: 'test',
    });
}

export const setUserData = async (page) => {
    await request(page, `http://localhost:3000/graphql`, 'POST', {
        query: `
            mutation (
                $profile: ProfileInput,
                $reading: String,
                $goalsDescription: String,
                $goals: [GoalInput]!,
                $reads: [ReadInput]!
            ) {
                updateProfile(profile: $profile) {
                    _id
                }
                updateReading(reading: $reading) {
                    _id
                }
                updateGoalsDescription(goals: $goalsDescription) {
                    _id
                }
                updateGoals(goals: $goals) {
                    _id
                }
                updateReads(reads: $reads) {
                    _id
                }
            }
        `,
        variables: {
            profile: {
                name: 'Test User',
                about: 'Test user about',
                bio: 'Test user bio',
                website: 'http://website',
                blog: 'http://blog',
                youtube: 'http://youtube',
                twitter: 'http://twitter',
                reddit: 'http://reddit',
                patreon: 'http://patreon',
                gender: 'male',
                city: 'Zurich',
                country: 'ch',
                selfAuthoringPast: true,
                selfAuthoringPresentVirtues: true,
                selfAuthoringPresentFaults: true,
                selfAuthoringFuture: true,
                understandMyself: true,
                agreeableness: 50,
                compassion: 50,
                politeness: 50,
                conscientiousness: 50,
                industriousness: 50,
                orderliness: 50,
                extraversion: 50,
                enthusiasm: 50,
                assertiveness: 50,
                neuroticism: 50,
                withdrawal: 50,
                volatility: 50,
                opennessToExperience: 50,
                intellect: 50,
                openness: 50,                    
            },
            reading: 'Test user reading',
            goalsDescription: 'Test user goals',
            reads: [
                {
                    title: 'Read',
                    articleUrl: 'http://example.com/article',
                    videoUrl: 'http://example.com/video',
                },
                {
                    title: 'Read - reading',
                    reading: true,
                },
                {
                    title: 'Read - read',
                    read: true,
                },
            ],
            goals: [
                {
                    title: 'Goal',
                },
                {
                    title: 'Goal - doing',
                    doing: true,
                },
                {
                    title: 'Goal - done',
                    done: true,
                },
            ],
        },
    })
}
