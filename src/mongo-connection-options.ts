import { ConnectOptions } from 'mongoose';

interface MongoConnectionOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

export default MongoConnectionOptions;
