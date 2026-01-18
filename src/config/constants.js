export const GRAVITY = -20;
export const MOVE_SPEED = 0.25;
export const MOVE_ACCELERATION = 1;
export const FRICTION = 0.85;
export const MIN_JUMP_VELOCITY = 10;
export const MAX_JUMP_VELOCITY = 18;
export const CHARGE_TIME = 1.0;

export const COLORS = {
    PLAYER_BASE: 0xff3344,
    PLAYER_CHARGED: 0x8b0000,
    PLATFORM: 0x4a4a4a,
    GOAL: 0xffd700,
    SKY: 0x87ceeb
};

export const STAGES = [
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
];

export const PLATFORMS = [
    { position: { x: 0, y: -0.25, z: 2.5 }, size: { x: 10, y: 0.5, z: 15 } },
    { position: { x: 0, y: -0.25, z: 12 }, size: { x: 10, y: 0.5, z: 4 } },
    { position: { x: 0, y: -0.25, z: 21 }, size: { x: 10, y: 0.5, z: 8 } },
    { position: { x: 0, y: -0.25, z: 27.5 }, size: { x: 10, y: 0.5, z: 5 } },
    { position: { x: 0, y: -0.25, z: 41.5 }, size: { x: 10, y: 0.5, z: 7 } },
    { position: { x: 0, y: -0.25, z: 47.5 }, size: { x: 10, y: 0.5, z: 5 }, isGoal: true }
];

export const COLLISION_BOUNDS = [
    { minZ: -5, maxZ: 10, minX: -5, maxX: 5 },
    { minZ: 10, maxZ: 14, minX: -5, maxX: 5 },
    { minZ: 17, maxZ: 25, minX: -5, maxX: 5 },
    { minZ: 25, maxZ: 30, minX: -5, maxX: 5 },
    { minZ: 38, maxZ: 45, minX: -5, maxX: 5 },
    { minZ: 45, maxZ: 50, minX: -5, maxX: 5 }
];

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
