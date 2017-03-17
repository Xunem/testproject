import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import {FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {TopicServiceService} from "../topic-service.service";
import {knTopic} from "../knTopic";



@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
  id:string;

  currentTopicTitleObs:FirebaseObjectObservable<any>;
  currentTopicTitle:string;

  currentTopicDescObs:FirebaseObjectObservable<any>;
  currentTopicDesc:string;

  currentTopicSubTopicKeysObs:FirebaseListObservable<string[]>;
  currentTopicItemKeysObs:FirebaseListObservable<string[]>;

  subTopics:FirebaseObjectObservable<knTopic>[];
  subTopicTitle = {};
  subTopicDesc = {};
  items:FirebaseObjectObservable<knTopic>[];

  editTopic: knTopic;
  editId: string;
  newTopic: knTopic;
  lastTitle: boolean;
  show:boolean = false;

  constructor(
    private topicService:TopicServiceService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.route.params
    // (+) converts string 'id' to a number
    .subscribe((x) => this.initTopic(x["id"]));

    
  }
  initTopic(id:string){
    console.log(id);
    this.id = id;
    this.currentTopicTitleObs = this.topicService.getTopicTitle(this.id);
    this.currentTopicTitleObs.subscribe((x) => this.currentTopicTitle = x.$value);

    this.currentTopicDescObs = this.topicService.getTopicDesc(this.id);
    this.currentTopicDescObs.subscribe((x) => this.currentTopicDesc = x.$value);

    

    this.currentTopicSubTopicKeysObs = this.topicService.getSubTopicKeys(this.id);


    this.currentTopicItemKeysObs = this.topicService.getItemKeys(this.id);
  }
  getTopicDesc(id:string){
    this.topicService.getTopicDesc(id).subscribe((x) => this.subTopicDesc[id] = x.$value);
    return this.subTopicDesc[id];
  }
  getTopicTitle(id:string){
    this.topicService.getTopicTitle(id).subscribe((x) => this.subTopicTitle[id] = x.$value);
    return this.subTopicTitle[id];
  }

  onSelect(topic: knTopic, id:string): void {
    if (this.editTopic !== undefined) {
      if (this.editTopic.title !== '' && this.editTopic.desc !== '') {
        if (topic === this.editTopic) {
          this.editTopic = undefined;
          this.editId = undefined;
        } else {
          this.editTopic = topic;
          this.editId = id;
        }
      } else {
        window.alert("Topics need a Title and Description!");
      }
    } else {
      this.editTopic = topic;
      this.editId = id;
    }
  }

  showNewTopicDialogue(): void {
    this.newTopic = {
      title: '',
      desc: '',
      parent: '',
      topics: [],
      items: []
    };
    console.log("hhhhh");
    this.show = true;
  }

  hideNewTopicDialoge(): void {
    this.show = false;
  }

  showNew(): boolean {
    return this.show;
  }

   addTopic(): void {
    if (this.newTopic !== undefined) {
      if (this.newTopic.title !== '' && this.newTopic.desc !== '') {
        this.newTopic.parent = this.id;
        this.topicService.addTopic(this.newTopic);
        this.show = false;
      } else {
        window.alert("Topics need a Title and Description!");
      }
    }
  }

  deleteTopic(key:string):void{
    this.topicService.deleteTopic(key);
  }
  updateTopicTitle(key:string, updated:string):void{
    this.topicService.updateTopicTitle(key, updated);
    this.lastTitle = true;
  }

}
