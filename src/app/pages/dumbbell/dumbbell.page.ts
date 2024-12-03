import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { timer } from 'rxjs';

@Component({
  selector: 'app-dumbbell',
  templateUrl: './dumbbell.page.html',
  styleUrls: ['./dumbbell.page.scss'],
  standalone:true,
  imports: [IonicModule, LottieComponent]
})
export class DumbbellPage implements OnInit {
  options: AnimationOptions = {
    path: '/assets/lotties/dumbbell.json', // Ruta a tu archivo de animación
  };

  onAnimationCreated(animationItem: AnimationItem): void {
    console.log('Animación creada:', animationItem);
  }
  constructor(
    private router:Router,
  ) { }

  ngOnInit() {
    timer(5000).subscribe(_=>{
      this.router.navigate(['/home']);
    });
  }

}
