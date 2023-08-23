import type { ISixForceInterface } from "./SixForceInterface";

export interface IPlane {
    name: string;
    persons: number; // 人数
    weight: number; // 重量 kg
    length: number; // 长度
    span: number; // 翼展
    height: number; // 高度
    sixForce: ISixForceInterface;
    run(sixForce: ISixForceInterface): void;
}