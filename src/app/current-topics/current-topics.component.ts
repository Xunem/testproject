import { Component, OnInit } from '@angular/core';
import {knTopic} from "../knTopic";
import {TopicServiceService} from "../topic-service.service";



@Component({
  selector: 'app-current-topics',
  templateUrl: './current-topics.component.html',
  styleUrls: ['./current-topics.component.css']
})
export class CurrentTopicsComponent implements OnInit {
  currentTopics: knTopic[];
  constructor(private topicService: TopicServiceService) {

  }

  ngOnInit() {

    this.currentTopics = this.topicService.getCurrentTopics();
  }



  editTopic: knTopic;
  newTopic: knTopic;
  onSelect(topic: knTopic): void {
    if (this.editTopic !== undefined){
      if(this.editTopic.title !== '' && this.editTopic.desc !== ''){
        if (topic === this.editTopic) {
          this.editTopic = undefined;
        } else {
          this.editTopic = topic;
        }
      } else{
        window.alert("Topics need a Title and Description!");
      }
    }else{
      this.editTopic = topic;
    }
  }

  addTopic():void{
    this.newTopic = {
      title: '',
      desc: '',
      topics: [],
      items: []
    };

    if (this.editTopic !== undefined){
      if(this.editTopic.title !== '' && this.editTopic.desc !== ''){
        this.topicService.addTopic(this.newTopic);
        this.editTopic = this.newTopic;
      } else{
        window.alert("Topics need a Title and Description!");
      }
    }else{
      this.topicService.addTopic(this.newTopic);
      this.editTopic = this.newTopic;
    }
  }
  deleteTopic(topic: knTopic):void{
    this.editTopic = undefined;
    this.topicService.deleteTopic(topic);
  }

}
