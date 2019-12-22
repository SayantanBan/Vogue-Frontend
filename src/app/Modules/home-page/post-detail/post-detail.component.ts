import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/Shared/Services/post.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Post } from 'src/app/Shared/Models/Post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  fbCommentPluginLink: string
  fbUrl: SafeUrl;
  script: any = 'javascript:FB.XFBML.parse()';
  trustedScript: any;
  post: Post;
  constructor(private route: ActivatedRoute, private service: PostService, private sanitizer: DomSanitizer) {
    this.loadAPI();
  }

  ngOnInit() {
    this.getPostDetail();
  }

  loadAPI() {
    this.trustedScript = this.sanitizer.bypassSecurityTrustUrl(this.script);
    var js1 = document.createElement('script');
    js1.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.3&appId=616949518696820&autoLogAppEvents=1';
    document.body.appendChild(js1);
    var js2 = document.createElement('script');
    js2.src = '../assets/js/XFBML.js';
    document.body.appendChild(js2);
  }

  getPostDetail() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.post = this.service.getUniquePost(id)
    // this.service.getPost(id).subscribe(result => {console.log(result);this.post = result}, error => console.log(error));
    this.fbCommentPluginLink = "http://localhost:4200/home/detail/" + id;
    this.fbUrl = this.sanitizer.bypassSecurityTrustUrl(this.fbCommentPluginLink);
  }
}
