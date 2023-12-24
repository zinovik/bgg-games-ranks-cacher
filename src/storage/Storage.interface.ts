import { Data } from '../common/model/Data.interface';

export interface StorageService {
  setData(data: Data): Promise<void>;
}
