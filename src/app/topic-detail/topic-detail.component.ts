import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import {TopicServiceService} from "../topic-service.service";
import {knTopic} from "../knTopic";



@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {

  currentTopic:knTopic;
  editTopic:knTopic;

  constructor(
    private topicService:TopicServiceService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.currentTopic = this.topicService.getTopic(this.route.snapshot.params['id']);
  }

  onSelect(topic: knTopic): void {

  }

  addTopic():void{

  }

  deleteTopic(topic: knTopic):void{

  }
}
