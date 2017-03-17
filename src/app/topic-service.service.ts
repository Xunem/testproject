import { Injectable } from '@angular/core';
import {knTopic} from "./knTopic";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";


@Injectable()
export class TopicServiceService {
  currentTopics:knTopic[];
 /* currentTopics: knTopic[] = [
    {
      title: 'Web Development',
      desc: 'Web development is a broad term for the work involved in developing a web site for the Internet (World Wide Web) or an intranet (a private network).',
      topics: [
        {
          title: 'Front End',
          desc: 'Front-end web development, also known as client-side development is the practice of producing HTML, CSS and JavaScript for a website or Web Application',
          topics: [],
          items: []
        },
        {
          title: 'Back End',
          desc: 'Front-end web development, also known as client-side development is the practice of producing HTML, CSS and JavaScript for a website or Web Application',
          topics: [],
          items: []
        }
      ],
      items: [
        {
          title: 'Web Development 101',
          type: 'Book',
          desc: 'Web Development out of the Box is a new type of web development course. Designed principally with Christian home-school educators in mind, the course is for high school teenagers, but can also be used by adults. The course takes the premise that students want to get to design good looking sites as soon as possible. So, the course starts from installing the Wordpress content management system, and shows the student how it works. At various intervals, the students are invited to dig deeper, examining the technologies and coding skills required below the surface.'
        }
      ]
    },
    {
      title: 'SciFi Movies',
      desc: 'Section about Science Fiction movies',
      topics: [],
      items: []
    }
  ];*/

  items: FirebaseListObservable<knTopic[]>;

  constructor(private af: AngularFire) {
    this.items = af.database.list('/topics', {
      query: {
        orderByChild: 'parent',
        equalTo: -1
      }});
  }

  getCurrentTopics(): FirebaseListObservable<knTopic[]> {
    return this.items;

  }

  addTopic(newTopic: knTopic): void {
    
    const key = this.items.push(newTopic).key;
    console.log(key);
    if(newTopic.parent !== -1){
      this.af.database.list('/topics/'+newTopic.parent+'/topics').push(key);
    }

  }

  updateTopicTitle(key:string, updated:string):void{
    this.items.update(key, { title: updated});
  }

  updateTopicDesc(key:string, updated:string):void{
    this.items.update(key, { desc: updated});
  }

  deleteTopic(key: string): void {
    this.items.remove(key);
  }

  getTopic(id: string): FirebaseObjectObservable<knTopic> {
    return this.af.database.object('/topics/'+id);
  }

  getTopicTitle(id: string): FirebaseObjectObservable<any>{
    return this.af.database.object('/topics/'+id+'/title');
  }

  getTopicDesc(id: string): FirebaseObjectObservable<any>{
    return this.af.database.object('/topics/'+id+'/desc');
  }

  getSubTopicKeys(id: string): FirebaseListObservable<string[]>{
    return this.af.database.list('/topics/'+id+'/topics');
  }

  getItemKeys(id: string): FirebaseListObservable<string[]>{
    return this.af.database.list('/topics/'+id+'/items');
  }
}
