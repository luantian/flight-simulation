export interface ISixForceInterface {
    elevating: number; // 升力
    side: number; // 侧力
    resistance: number; // 阻力
    rollingMoment: number; // 滚转力矩
    yawMoment: number; // 偏航力矩
    pitchingMoment: number; // 俯仰力矩
}
