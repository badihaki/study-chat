import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLauncherComponent } from './chat-launcher.component';

describe('ChatLauncherComponent', () => {
  let component: ChatLauncherComponent;
  let fixture: ComponentFixture<ChatLauncherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatLauncherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
