export class TimeHelper {
  static parseDurationToMs(duration: string | number): number {
    if (typeof duration === 'number') {
      return duration * 1000;
    }
  
    const match = /^(\d+)([smhd])$/.exec(duration.trim());
    if (!match) {
      throw new Error(`Invalid duration format: ${duration}`);
    }
  
    const value = parseInt(match[1], 10);
    const unit = match[2];
  
    const multipliers: Record<string, number> = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };
  
    return value * multipliers[unit];
  }
}