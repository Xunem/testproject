/**
 * Created by Marian on 15.03.2017.
 */
import {knItem} from "./knItem";

export class knTopic{
  title: String;
  desc: String;
  parent;
  topics: knTopic[];
  items: knItem[];
}
