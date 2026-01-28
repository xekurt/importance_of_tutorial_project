export const GRAVITY = -25;
export const MOVE_SPEED = 0.5;
export const MOVE_ACCELERATION = 1.5;
export const FRICTION = 0.85;
export const MIN_JUMP_VELOCITY = 12;
export const MAX_JUMP_VELOCITY = 18;
export const CHARGE_TIME = 0.8;

export const COLORS = {
    PLAYER_BASE: 0xff6666,
    PLAYER_CHARGED: 0x8b0000,
    PLATFORM: 0x4a4a4a,
    OBSTACLE: 0xff5500,
    GOAL: 0xffd700,
    SKY: 0x87ceeb
};

export const LEVELS = [
    {
        id: 1,
        name: 'Level 1: The Basics',
        stages: [
            {
                name: 'Stage 1',
                spawnPoint: { x: 0, y: 0.5, z: 0 },
                text: 'Hold SPACE to Charge, Release to Jump',
                platformStart: -5,
                platformEnd: 10
            },
            {
                name: 'Stage 2',
                spawnPoint: { x: 0, y: 0.5, z: 12 },
                text: 'Jump across the gap!',
                platformStart: 10,
                platformEnd: 14,
                gapEnd: 17,
                nextPlatformEnd: 25
            },
            {
                name: 'Stage 3',
                spawnPoint: { x: 0, y: 0.5, z: 28 },
                text: 'Maximum Power Required!',
                platformStart: 25,
                platformEnd: 30,
                gapEnd: 38,
                nextPlatformEnd: 45
            }
        ],
        platforms: [
            { position: { x: 0, y: -0.25, z: 2.5 }, size: { x: 10, y: 0.5, z: 15 } },
            { position: { x: 0, y: -0.25, z: 12 }, size: { x: 10, y: 0.5, z: 4 } },
            { position: { x: 0, y: -0.25, z: 21 }, size: { x: 10, y: 0.5, z: 8 } },
            { position: { x: 0, y: -0.25, z: 27.5 }, size: { x: 10, y: 0.5, z: 5 } },
            { position: { x: 0, y: -0.25, z: 41.5 }, size: { x: 10, y: 0.5, z: 7 } },
            { position: { x: 0, y: -0.25, z: 47.5 }, size: { x: 10, y: 0.5, z: 5 }, isGoal: true }
        ],
        collisionBounds: [
            { minZ: -5, maxZ: 10, minX: -5, maxX: 5 },
            { minZ: 10, maxZ: 14, minX: -5, maxX: 5 },
            { minZ: 17, maxZ: 25, minX: -5, maxX: 5 },
            { minZ: 25, maxZ: 30, minX: -5, maxX: 5 },
            { minZ: 38, maxZ: 45, minX: -5, maxX: 5 },
            { minZ: 45, maxZ: 50, minX: -5, maxX: 5 }
        ],
        obstacles: []
    },
    {
        id: 2,
        name: 'Level 2: The Obstacles',
        stages: [
            {
                name: 'Stage 1',
                spawnPoint: { x: 0, y: 0.5, z: 0 },
                text: 'Watch out for the blocks!',
                platformStart: -5,
                platformEnd: 10
            },
            {
                name: 'Stage 2',
                spawnPoint: { x: 0, y: 0.5, z: 15 },
                text: 'Time your jump carefully',
                platformStart: 10,
                platformEnd: 14,
                gapEnd: 18,
                nextPlatformEnd: 25
            },
            {
                name: 'Stage 3',
                spawnPoint: { x: 0, y: 0.5, z: 30 },
                text: 'Precision is key!',
                platformStart: 25,
                platformEnd: 30,
                gapEnd: 40,
                nextPlatformEnd: 50
            }
        ],
        platforms: [
            { position: { x: 0, y: -0.25, z: 2.5 }, size: { x: 10, y: 0.5, z: 15 } },
            { position: { x: 0, y: -0.25, z: 15 }, size: { x: 10, y: 0.5, z: 6 } },
            { position: { x: 0, y: -0.25, z: 30 }, size: { x: 10, y: 0.5, z: 10 } },
            { position: { x: 0, y: -0.25, z: 50 }, size: { x: 10, y: 0.5, z: 10 }, isGoal: true }
        ],
        collisionBounds: [
            { minZ: -5, maxZ: 10, minX: -5, maxX: 5 },
            { minZ: 12, maxZ: 18, minX: -5, maxX: 5 },
            { minZ: 25, maxZ: 35, minX: -5, maxX: 5 },
            { minZ: 45, maxZ: 55, minX: -5, maxX: 5 }
        ],
        obstacles: [
            { position: { x: 0, y: 3, z: 12 }, size: { x: 10, y: 1, z: 0.5 } },
            { position: { x: 0, y: 4, z: 20 }, size: { x: 10, y: 1, z: 0.5 } },
            { position: { x: 0, y: 5, z: 40 }, size: { x: 10, y: 1, z: 0.5 } }
        ]
    },
    {
        id: 3,
        name: 'Level 3: Master of the Walls',
        stages: [
            {
                name: 'Stage 1',
                spawnPoint: { x: 0, y: 0.5, z: 0 },
                text: 'Master the Wall Jump to cross the abyss!',
                platformStart: -5,
                platformEnd: 10,
                nextPlatformEnd: 33
            },
            {
                name: 'Rest Stage',
                spawnPoint: { x: 0, y: 0.5, z: 38 },
                text: 'Safe Zone reached! Ready for the home stretch?',
                platformStart: 33,
                platformEnd: 43,
                nextPlatformEnd: 70
            }
        ],
        platforms: [
            { position: { x: 0, y: -0.25, z: 2.5 }, size: { x: 10, y: 0.5, z: 15 } },
            { position: { x: 0, y: -0.25, z: 38 }, size: { x: 10, y: 0.5, z: 10 } },
            { position: { x: 0, y: -0.25, z: 75 }, size: { x: 10, y: 0.5, z: 10 }, isGoal: true }
        ],
        collisionBounds: [
            { minZ: -5, maxZ: 10, minX: -5, maxX: 5 },
            { minZ: 33, maxZ: 43, minX: -5, maxX: 5 },
            { minZ: 70, maxZ: 80, minX: -5, maxX: 5 }
        ],
        obstacles: [
            // Row 1 - Close to start
            { position: { x: -4.5, y: 4, z: 16 }, size: { x: 1, y: 10, z: 4 } },
            { position: { x: 4.5, y: 4, z: 16 }, size: { x: 1, y: 10, z: 4 } },

            // Row 2
            { position: { x: -4.5, y: 5, z: 27 }, size: { x: 1, y: 12, z: 5 } },
            { position: { x: 4.5, y: 5, z: 27 }, size: { x: 1, y: 12, z: 5 } },

            // Row 3
            { position: { x: -4.5, y: 6, z: 51 }, size: { x: 1, y: 14, z: 6 } },
            { position: { x: 4.5, y: 6, z: 51 }, size: { x: 1, y: 14, z: 6 } },

            // Row 4
            { position: { x: -4.5, y: 7, z: 65 }, size: { x: 1, y: 16, z: 6 } },
            { position: { x: 4.5, y: 7, z: 65 }, size: { x: 1, y: 16, z: 6 } }
        ]
    }
];

// Re-export constants for backward compatibility where needed, 
// though we'll update the systems to use LEVELS
export const STAGES = LEVELS[0].stages;
export const PLATFORMS = LEVELS[0].platforms;
export const COLLISION_BOUNDS = LEVELS[0].collisionBounds;

export const PARTICLE_SETTINGS = {
    GOAL_COUNT: 100,
    TRAIL_MAX: 50,
    TRAIL_LIFETIME: 0.5
};

export const CAMERA_SETTINGS = {
    FOV: 75,
    NEAR: 0.1,
    FAR: 1000,
    INITIAL_POSITION: { x: 0, y: 8, z: 12 },
    FOLLOW_DISTANCE: 12,
    LERP_FACTOR: 0.1
};

export const LIGHTING = {
    AMBIENT_INTENSITY: 0.6,
    DIRECTIONAL_INTENSITY: 0.8,
    DIRECTIONAL_POSITION: { x: 10, y: 20, z: 10 }
};
