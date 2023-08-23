export interface IPlane {
    name: string;
    persons: number; // 人数
    weight: number; // 重量 吨
    length: number; // 长度
    span: number; // 翼展
    height: number; // 高度
    
    run(): void;
    fly(): void;
}