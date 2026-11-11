window.PORTFOLIO_PROJECTS = {
  "basketball": {
    "eyebrow": "COMPUTER VISION / SPORTS ANALYTICS",
    "title": "Turning game footage into a clearer picture of play.",
    "summary": "A basketball video-analysis pipeline connecting player and ball tracking with tactical court views, event timelines, and structured scouting outputs.",
    "role": "Project focus · Tracking, video analysis & system integration",
    "stack": [
      "Python",
      "YOLOv8",
      "ByteTrack",
      "OpenCV",
      "EasyOCR",
      "FastAPI"
    ],
    "video": {
      "src": "assets/media/basketball-analysis.mp4",
      "poster": "assets/media/basketball-poster.jpg",
      "label": "Basketball analysis in action",
      "duration": "30 seconds"
    },
    "sections": [
      {
        "title": "Problem",
        "body": "Basketball footage is difficult to track: players overlap, the camera moves, and the ball can disappear behind a body. Useful analysis starts with keeping those uncertain moments from becoming misleading data."
      },
      {
        "title": "Technical approach",
        "body": "Detection and tracking are combined with team, appearance, and motion cues to reconnect player tracks. Ball candidates are evaluated across the clip, with gaps retained when evidence is weak. Jersey-color grouping and homography support a top-down court view."
      },
      {
        "title": "Outputs & integration",
        "body": "The recording shows annotated game footage with player and ball tracking. The wider pipeline includes jersey OCR, possession signals, heuristic events, timelines, and structured exports. FastAPI endpoints support analysis jobs, result retrieval, and video playback."
      },
      {
        "title": "Scope & attribution",
        "body": "This demonstration builds on the basketball-analysis foundation published by Hana FEKI and the original ENSTA Paris academic project. The case study describes recorded-video analysis and the pipeline’s review workflow."
      }
    ],
    "links": [
      {
        "label": "GitHub case study",
        "url": "https://github.com/Mason-Adedortman/basketball-ai-analysis"
      },
      {
        "label": "Original project foundation",
        "url": "https://github.com/HanaFEKI/AI_BasketBall_Analysis_v0"
      }
    ]
  },
  "tennis": {
    "eyebrow": "COMPUTER VISION / SPORTS ANALYTICS",
    "title": "Turn a rally into a clearer picture of the game.",
    "summary": "An annotated tennis-video demonstration combining player and ball tracking, court keypoints, a top-down mini-court, and motion estimates.",
    "role": "Project focus · Tennis tracking, court mapping & video analysis",
    "stack": [
      "Python",
      "YOLOv8",
      "OpenCV",
      "PyTorch",
      "ResNet50",
      "pandas"
    ],
    "video": {
      "src": "assets/media/tennis-analysis.mp4",
      "poster": "assets/media/tennis-poster.jpg",
      "label": "Tennis analysis in action",
      "duration": "16 seconds"
    },
    "sections": [
      {
        "title": "Problem",
        "body": "A tennis rally moves quickly. Following both players and a small, fast-moving ball requires visual detections to stay connected across frames and grounded in the court’s geometry."
      },
      {
        "title": "Technical approach",
        "body": "YOLO-based detection tracks players and locates the ball, with interpolation filling gaps in the ball trajectory. A ResNet50 model estimates court keypoints, while coordinate mapping places the detections on a top-down mini-court."
      },
      {
        "title": "Demonstrated output",
        "body": "The recording combines labeled player boxes, ball positions, court landmarks, and a mini-court overlay. A statistics panel displays estimated shot and player speeds alongside running averages."
      },
      {
        "title": "Scope",
        "body": "A recorded-video analysis demonstration. Speed values are estimates derived from video timing and spatial assumptions; the supplied materials do not establish a validated accuracy benchmark or live-processing performance."
      }
    ],
    "links": [
      {
        "label": "GitHub case study",
        "url": "https://github.com/Mason-Adedortman/tennis-analysis-system"
      }
    ]
  },
  "simshield": {
    "eyebrow": "RECORDED DEMO / COMPUTER VISION",
    "title": "A command center for camera-based alerts.",
    "summary": "A recorded security-dashboard demo bringing camera controls, gun-detection alerts, and monitoring analytics into one interface.",
    "role": "Project focus · Camera monitoring & detection-alert workflows",
    "stack": [
      "Camera monitoring",
      "Detection alerts",
      "Dashboard analytics"
    ],
    "sections": [
      {
        "title": "Problem",
        "body": "Camera activity and detection alerts need a clear operational view. The demonstrated product brings monitoring controls and alert review into a single command-center interface."
      },
      {
        "title": "Demonstrated approach",
        "body": "Cameras can be activated or deactivated from the dashboard. Gun-detection alerts include timestamps and confidence information, while monitoring analytics summarize activity."
      },
      {
        "title": "Output & scope",
        "body": "The 45-second product walkthrough focuses on the monitoring workflow: camera controls, alert review, and command-center analytics, presented together in a single dashboard."
      }
    ],
    "links": [
      {
        "label": "GitHub case study",
        "url": "https://github.com/Mason-Adedortman/simshield-ai"
      },
      {
        "label": "Watch the product walkthrough",
        "url": "https://www.loom.com/share/c727ba1fe93048299086ba1e240700b0"
      }
    ],
    "demoId": "c727ba1fe93048299086ba1e240700b0",
    "demoDuration": "45 seconds"
  },
  "pdpods": {
    "eyebrow": "PRODUCT WALKTHROUGH / LICENSE PLATE SURVEILLANCE",
    "title": "Bring traffic monitoring into one view.",
    "summary": "PDPODS brings camera feeds, license-plate records, and organization management together in a surveillance dashboard.",
    "role": "Project focus · Plate records, camera context & operational interfaces",
    "stack": [
      "Role-based interfaces",
      "Camera feeds",
      "Organization management"
    ],
    "sections": [
      {
        "title": "Problem",
        "body": "Reviewing traffic activity requires a way to connect plate records with the relevant camera and location. PDPODS brings those tasks into a consistent surveillance dashboard."
      },
      {
        "title": "Demonstrated approach",
        "body": "Traffic camera feeds sit alongside license-plate records with camera context, timestamps, and confidence information. System-administrator and organization-administrator views organize monitoring around organizations and sites."
      },
      {
        "title": "Output & scope",
        "body": "The product walkthrough follows the operational interface: reviewing a plate record, checking camera activity, and navigating between organizations and sites through role-specific views."
      }
    ],
    "links": [
      {
        "label": "GitHub case study",
        "url": "https://github.com/Mason-Adedortman/pdpods"
      },
      {
        "label": "Watch the PDPODS walkthrough",
        "url": "https://www.loom.com/share/9950a3aacd794202a82af012c8ab3e4f"
      }
    ],
    "demoId": "9950a3aacd794202a82af012c8ab3e4f",
    "demoDuration": "2 min 30 sec"
  },
  "replay": {
    "eyebrow": "FULL-STACK ENGINEERING / PRODUCT ANALYTICS",
    "title": "Make user journeys easier to understand.",
    "summary": "A UXCam-inspired session replay project that connects browser event capture with a replay experience and a backend ingestion workflow.",
    "role": "Project focus · Session replay & product analytics",
    "stack": [
      "React",
      "Node.js",
      "TypeScript",
      "Supabase",
      "rrweb"
    ],
    "video": {
      "src": "assets/media/session-replay.mp4",
      "poster": "assets/media/session-replay-poster.jpg",
      "label": "Session replay product walkthrough",
      "duration": "1 min 20 sec"
    },
    "sections": [
      {
        "title": "Problem",
        "body": "A sequence of events becomes more useful when a team can see the interaction that produced it. This project explores that workflow through recorded browser sessions and replay."
      },
      {
        "title": "Technical approach",
        "body": "The implementation brings together a React interface, rrweb event capture and replay, and a Node.js ingestion layer, with TypeScript and Supabase in the stack."
      },
      {
        "title": "Demonstrated output",
        "body": "The recording demonstrates an analytics interface with funnels, heatmaps, session lists, and recorded interaction playback. The project connects captured browser events to an inspectable user journey."
      },
      {
        "title": "Scope",
        "body": "A UXCam-inspired project exploring session replay and product analytics. The showcase centers on captured browser interactions, an analytics interface, and the workflow for reviewing individual sessions."
      }
    ],
    "links": [
      {
        "label": "GitHub case study",
        "url": "https://github.com/Mason-Adedortman/session-replay-analytics"
      }
    ]
  }
};
