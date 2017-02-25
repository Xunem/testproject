import { Component } from '@angular/core';

export class knTopic{
  title: String;
  desc: String;
  topics: knTopic[];
  items: knItem[];
}

export class knItem{
  title: String;
  type: String;
  desc: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Patrick';
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
        this.currentTopics.push(this.newTopic);
        this.editTopic = this.newTopic;
      } else{
        window.alert("Topics need a Title and Description!");
      }
    }else{
      this.currentTopics.push(this.newTopic);
      this.editTopic = this.newTopic;
    }
  }
  deleteTopic(topic: knTopic):void{
    this.editTopic = undefined;
    let index = this.currentTopics.indexOf(topic);
    this.currentTopics.splice(index, 1);
  }
}
