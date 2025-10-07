import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  features = [
    {
      title: 'Unmatched Security',
      description: 'We prioritize the safety of your digital assets with cutting-edge security protocols, ensuring your peace of mind in this ever-evolving digital landscape.',
      icon: 'security'
    },
    {
      title: 'Future-Proof Technology',
      description: 'Our commitment to staying ahead of the curve guarantees that our solutions are equipped to adapt and thrive in the rapidly changing technological landscape.',
      icon: 'technology'
    },
    {
      title: 'Tailored for Success',
      description: 'Every solution we craft is meticulously customized to meet your specific needs, ensuring seamless integration and optimal performance.',
      icon: 'success'
    },
    {
      title: 'Global Reach, Personal Touch',
      description: 'We serve clients worldwide, yet maintain a personalized approach that nurtures strong, lasting partnerships.',
      icon: 'global'
    }
  ];

  companyValues = [
    {
      title: 'What we do',
      description: 'we specialize in cutting-edge technologies, focusing on Blockchain, Data Engineering, and Artificial Intelligence. Our mission is to empower businesses and individuals with secure and innovative solutions, driving progress and connectivity in the modern world.'
    },
    {
      title: 'Why we do',
      description: 'Our passion lies in driving innovation and making a positive impact on people\'s lives. By delivering bespoke, high-quality solutions, we build trustworthy partnerships with our clients, fostering success and contributing to a brighter, more interconnected future.'
    },
    {
      title: 'How we do',
      description: 'we leverage our expert talent and innovation-driven approach to provide cutting-edge solutions in Blockchain, Data Engineering, and AI. Through tailored services and rigorous quality control, we empower clients for success in a rapidly evolving world. Our agile project management ensures efficient delivery, driving progress and connectivity in the modern technological landscape.'
    }
  ];

  partners = [
    'Our office space', 'Our office space', 'Our office space',
    'Our office space', 'Our office space', 'Our office space',
    'Our office space', 'Our office space', 'Our office space'
  ];

  constructor() { }

  ngOnInit(): void { }
}
