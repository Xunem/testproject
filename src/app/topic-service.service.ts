import { Injectable } from '@angular/core';
import {knTopic} from "./knTopic";

@Injectable()
export class TopicServiceService {
  currentTopics: knTopic[] = [
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
  ];

  constructor() {
  }

  getCurrentTopics(): knTopic[] {
    return this.currentTopics;
  }

  addTopic(newTopic: knTopic): void {

    this.currentTopics.push(newTopic);

  }

  deleteTopic(topic: knTopic): void {
    let index = this.currentTopics.indexOf(topic);
    this.currentTopics.splice(index, 1);
  }

  getTopic(id: number): knTopic {
    let temp:knTopic[] = this.currentTopics;
    return this.currentTopics.find(function (d) {
      return temp.indexOf(d) == id;
    });
  }
}
