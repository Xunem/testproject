import { Component, OnInit, OnChanges, SimpleChanges, DoCheck, ElementRef } from '@angular/core';
import {knTopic} from "../knTopic";
import {TopicServiceService} from "../topic-service.service";
import {FirebaseListObservable} from "angularfire2";




@Component({
  selector: 'app-current-topics',
  templateUrl: './current-topics.component.html',
  styleUrls: ['./current-topics.component.css']
})

export class CurrentTopicsComponent implements OnInit {
  currentTopics: FirebaseListObservable<knTopic[]>;
  show: boolean = false;

  constructor(private topicService: TopicServiceService, private elRef:ElementRef) {
    this.show = false;
  }

  ngOnInit() {

    this.currentTopics = this.topicService.getCurrentTopics();
    
  }

  ngDoCheck(){
    if(this.editId !== undefined){
       if(this.lastTitle){
        var divTitle = this.elRef.nativeElement.querySelector('#t'+this.editId);
        if(divTitle !== null){
           if(this.titleFocus){
            this.titleCountLast = this.titleCount;
            this.titleCount = divTitle.selectionStart;
          }else{
            divTitle.focus();
            divTitle.setSelectionRange(this.titleCountLast,this.titleCountLast)
          }
        }
      }else{
        var divTitle = this.elRef.nativeElement.querySelector('#d'+this.editId);
        if(divTitle !== null){
           if(this.descFocus){
            this.descCountLast = this.descCount;
            this.descCount = divTitle.selectionStart;
          }else{
            divTitle.focus();
            divTitle.setSelectionRange(this.descCountLast,this.descCountLast);
          }
        }
      }
    }
  }

  editTopic: knTopic;
  editId: string;
  newTopic: knTopic;
  lastTitle: boolean = true;
  titleFocus: boolean = false;
  titleCount: number;
  titleCountLast: number;
  descFocus:boolean = false;
  descCount:number;
  descCountLast: number;


  onSelect(topic: knTopic, id:string): void {
    if (this.editTopic !== undefined) {
      if (this.editTopic.title !== '' && this.editTopic.desc !== '') {
        if (id === this.editId) {
          this.editTopic = undefined;
          this.editId = undefined;
        } else {
          this.editTopic = topic;
          this.editId = id;
          this.titleCount = topic.title.length;
          this.titleCountLast = this.titleCount;
          this.descCount = topic.desc.length;
          this.descCountLast = this.descCount;
        }
      } else {
        window.alert("Topics need a Title and Description!");
      }
    } else {
      this.editTopic = topic;
      this.editId = id;
      this.titleCount = topic.title.length;
      this.titleCountLast = this.titleCount;
      this.descCount = topic.desc.length;
      this.descCountLast = this.descCount;
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
        this.newTopic.parent = -1;
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

  updateTopicDesc(key:string, updated:string):void{
    this.topicService.updateTopicDesc(key, updated);
    this.lastTitle = false;
  }

  toggleLastTitle(x:boolean):void{
    this.lastTitle = x;
  }

  toggleTitleFocus(x:boolean):void{
    this.titleFocus = x;
  }

  toggleDescFocus(x:boolean):void{
    this.descFocus = x;
  }
  
}
