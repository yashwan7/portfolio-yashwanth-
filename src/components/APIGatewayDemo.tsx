import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  Text, 
  MeshTransmissionMaterial, 
  Line, 
  PerspectiveCamera 
} from '@react-three/drei';
import * as THREE from 'three';

// ==========================================
// EASE IN OUT CUBIC (Apple-Style Camera Curve)
// ==========================================
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface PacketData {
  method: string;
  path: string;
  status: string;
  auth: string;
}

// ==========================================
// 1. REAL DATA PACKET COMPONENT
// ==========================================
function NetworkDataPacket({ start, end, progress, packetData }: { start: number[]; end: number[]; progress: number; packetData: PacketData }) {
  const packetRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (packetRef.current) {
      const currentPos = new THREE.Vector3().lerpVectors(
        new THREE.Vector3(...start),
        new THREE.Vector3(...end),
        progress
      );
      packetRef.current.position.copy(currentPos);
    }
  });

  return (
    <group ref={packetRef}>
      {/* 3D Glass Packet Body */}
      <mesh>
        <boxGeometry args={[0.9, 0.4, 0.1]} />
        <meshPhysicalMaterial 
          color="#0F172A" 
          roughness={0.2} 
          metalness={0.8} 
          transmission={0.6} 
          thickness={0.2} 
        />
      </mesh>
      {/* Glowing Neon Outline */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.92, 0.42, 0.12)]} />
        <lineBasicMaterial color="#00F2FE" linewidth={2} />
      </lineSegments>
      {/* Dynamic Packet Payload Text */}
      <Text position={[0, 0.08, 0.07]} fontSize={0.09} color="#00F2FE" fontWeight={700}>
        {`${packetData.method} ${packetData.path}`}
      </Text>
      <Text position={[0, -0.08, 0.07]} fontSize={0.07} color="#94A3B8">
        {`${packetData.status} | ${packetData.auth}`}
      </Text>
    </group>
  );
}

// ==========================================
// 2. PULSING CONNECTION TRAFFIC LINES
// ==========================================
function PulsingTrafficLine({ start, end, color = "#0052D4" }: { start: [number, number, number]; end: [number, number, number]; color?: string }) {
  const lineRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (lineRef.current && lineRef.current.material) {
      lineRef.current.material.dashOffset = -clock.getElapsedTime() * 3;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={[start, end]}
      color={color}
      lineWidth={2.5}
      dashed
      dashScale={6}
      dashSize={0.6}
    />
  );
}

// ==========================================
// 3. GATEWAY CORE WITH DYNAMIC GLOW PULSE
// ==========================================
function WorkingGatewayCore({ isProcessing }: { isProcessing: boolean }) {
  const coreRef = useRef<THREE.Group>(null);
  const materialRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (coreRef.current) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.03;
      coreRef.current.scale.set(s, s, s);
    }
    if (materialRef.current) {
      // Glow shifts between Deep Blue and Neon Cyan during processing
      const lerpFactor = (Math.sin(clock.getElapsedTime() * 8) + 1) / 2;
      const targetColor = isProcessing 
        ? new THREE.Color("#00F2FE").lerp(new THREE.Color("#0052D4"), lerpFactor)
        : new THREE.Color("#0052D4");
      materialRef.current.color = targetColor;
    }
  });

  return (
    <group ref={coreRef}>
      <mesh>
        <cylinderGeometry args={[1.3, 1.3, 0.5, 6]} />
        <MeshTransmissionMaterial
          ref={materialRef}
          backside
          thickness={0.6}
          roughness={0.1}
          transmission={0.9}
          color="#0052D4"
          ior={1.2}
        />
      </mesh>
      <Text position={[0, 0, 0.3]} fontSize={0.2} color="#00F2FE" fontWeight={700}>
        API GATEWAY
      </Text>
    </group>
  );
}

// ==========================================
// 4. ENTERPRISE WORLD MAP ORIGIN (India Node)
// ==========================================
function WorldMapOrigin() {
  return (
    <group position={[-5.5, 0, 3]}>
      {/* Map Outline Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial color="#1E293B" wireframe transparent opacity={0.3} />
      </mesh>
      {/* India Origin Ping */}
      <mesh position={[0.2, 0.1, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#00F2FE" toneMapped={false} />
      </mesh>
      <Text position={[0.2, 0.35, 0]} fontSize={0.14} color="#00F2FE" fontWeight={700}>
        IN (Asia-South)
      </Text>
    </group>
  );
}

// ==========================================
// 5. KUBERNETES REPLICA SERVICE PODS
// ==========================================
function K8sServicePod({ position, title, replicas, status }: { position: [number, number, number]; title: string; replicas: string; status: string }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[1.8, 0.9, 0.2]} />
        <meshPhysicalMaterial color="#0F172A" roughness={0.3} metalness={0.8} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.82, 0.92, 0.22)]} />
        <lineBasicMaterial color="rgba(255,255,255,0.1)" />
      </lineSegments>
      {/* Status Dot */}
      <mesh position={[0.7, 0.3, 0.12]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={status === 'Healthy' ? '#10B981' : '#F59E0B'} toneMapped={false} />
      </mesh>
      <Text position={[-0.1, 0.15, 0.12]} fontSize={0.15} color="#FFFFFF" fontWeight={700}>
        {title}
      </Text>
      <Text position={[-0.1, -0.08, 0.12]} fontSize={0.11} color="#94A3B8">
        {`Replicas: ${replicas}`}
      </Text>
      <Text position={[-0.1, -0.25, 0.12]} fontSize={0.1} color={status === 'Healthy' ? '#10B981' : '#F59E0B'}>
        {`● ${status}`}
      </Text>
    </group>
  );
}

// ==========================================
// 6. GRAFANA-STYLE SPARKLINE METRICS PANEL
// ==========================================
function GrafanaMetricsPanel({ reqId }: { reqId: string }) {
  const [metrics, setMetrics] = useState({ reqSec: 284, latency: 18, success: '99.94' });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        reqSec: Math.floor(280 + Math.random() * 18),
        latency: Math.floor(16 + Math.random() * 5),
        success: (99.90 + Math.random() * 0.08).toFixed(2),
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute', top: '70px', right: '16px', zIndex: 10,
      width: '190px', display: 'flex', flexDirection: 'column', gap: '8px',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', letterSpacing: '1px' }}>
        GRAFANA MONITORING
      </div>

      <div style={{ background: 'rgba(15, 17, 23, 0.85)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '8px 10px', backdropFilter: 'blur(10px)' }}>
        <div style={{ fontSize: '10px', color: '#94A3B8' }}>Requests/sec</div>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#00F2FE' }}>
          {metrics.reqSec} <span style={{ fontSize: '9px', color: '#64748B' }}>req/s</span>
        </div>
        <div style={{ fontSize: '9px', color: '#00F2FE', marginTop: '2px', letterSpacing: '2px' }}>
          ▁▂▃▄▅▆▇█▅▄▃
        </div>
      </div>

      <div style={{ background: 'rgba(15, 17, 23, 0.85)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '8px 10px', backdropFilter: 'blur(10px)' }}>
        <div style={{ fontSize: '10px', color: '#94A3B8' }}>Latency</div>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#10B981' }}>
          {metrics.latency} <span style={{ fontSize: '9px', color: '#64748B' }}>ms</span>
        </div>
        <div style={{ fontSize: '9px', color: '#10B981', marginTop: '2px', letterSpacing: '2px' }}>
          ▇▆▅▅▄▃▂▂▃▄▅
        </div>
      </div>

      <div style={{ background: 'rgba(15, 17, 23, 0.85)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '8px 10px', backdropFilter: 'blur(10px)' }}>
        <div style={{ fontSize: '10px', color: '#94A3B8' }}>Success Rate</div>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#3B82F6' }}>
          {metrics.success}%
        </div>
        <div style={{ fontSize: '9px', color: '#3B82F6', marginTop: '2px', letterSpacing: '2px' }}>
          ███████████
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. SYNCHRONIZED REALISTIC TERMINAL LOGS
// ==========================================
function PipelineContextLogs({ currentStep, reqId }: { currentStep: number; reqId: string }) {
  const stepLogs = [
    `[INGRESS] Ingress Accepted from IN (Asia-South) | ID: ${reqId}`,
    `[SECURITY] JWT Verified ✔ [sub: #usr_9912]`,
    `[AUTHORIZATION] RBAC Check Passed (Role: ADMIN) ✔`,
    `[RATE_LIMIT] Redis Token Bucket: 199/200 OK ✔`,
    `[CACHE] Cache Miss: Forwarding to Gateway Core`,
    `[ROUTER] Route Selected -> User Service Pod`,
    `[EGRESS] 200 OK | Latency: 18ms | Cache Refreshed`
  ];

  return (
    <div style={{
      position: 'absolute', bottom: '20px', left: '16px', zIndex: 10,
      width: '380px', height: '110px', background: 'rgba(10, 12, 16, 0.9)',
      border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
      padding: '10px', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
      color: '#A7F3D0', backdropFilter: 'blur(10px)', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '3px'
    }}>
      {stepLogs.slice(0, currentStep + 1).map((log, i) => (
        <div key={i} style={{ opacity: 0.5 + (i / 7) * 0.5 }}>
          <span style={{ color: '#00F2FE' }}>❯</span> {log}
        </div>
      ))}
    </div>
  );
}

// ==========================================
// INTERACTIVE DEMO TRIGGER BUTTONS
// ==========================================
function InteractiveControls({ onTriggerRequest }: { onTriggerRequest: (method: string, path: string) => void }) {
  return (
    <div style={{
      position: 'absolute', top: '70px', left: '16px', zIndex: 20,
      display: 'flex', gap: '8px', fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <button 
        onClick={() => onTriggerRequest('POST', '/login')}
        style={{
          background: 'rgba(0, 242, 254, 0.15)', border: '1px solid #00F2FE', color: '#00F2FE',
          padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 700,
          backdropFilter: 'blur(8px)', transition: 'all 0.2s'
        }}
      >
        ▶ POST /login
      </button>
      <button 
        onClick={() => onTriggerRequest('GET', '/users')}
        style={{
          background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', color: '#10B981',
          padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 700,
          backdropFilter: 'blur(8px)', transition: 'all 0.2s'
        }}
      >
        ▶ GET /users
      </button>
    </div>
  );
}

// ==========================================
// 10. STAGGERED FADE-IN HERO ENDING
// ==========================================
function StaggeredHeroEnding({ visible, onReset }: { visible: boolean; onReset: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (visible) {
      const timers = [
        setTimeout(() => setStage(1), 300),
        setTimeout(() => setStage(2), 800),
        setTimeout(() => setStage(3), 1400)
      ];
      return () => timers.forEach(clearTimeout);
    } else {
      setStage(0);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: 'rgba(15, 17, 23, 0.94)', backdropFilter: 'blur(20px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: '#FFFFFF', fontFamily: 'Inter, system-ui, sans-serif', textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '32px', fontWeight: 800, margin: 0,
        background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        opacity: stage >= 1 ? 1 : 0, transform: stage >= 1 ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        Cloud Native API Gateway
      </h1>

      <div style={{
        margin: '20px 0', opacity: stage >= 2 ? 1 : 0,
        transform: stage >= 2 ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'
      }}>
        {['Authentication', 'Routing', 'Rate Limiting', 'Caching', 'Observability'].map((feat, i) => (
          <React.Fragment key={i}>
            <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500, letterSpacing: '0.5px' }}>{feat}</span>
            {i < 4 && <span style={{ color: '#00F2FE', fontSize: '10px' }}>•</span>}
          </React.Fragment>
        ))}
      </div>

      <div style={{ width: '60px', height: '1px', background: 'rgba(255,255,255,0.15)', margin: '12px 0 20px 0' }} />

      <div style={{
        fontSize: '12px', color: '#64748B', letterSpacing: '1.5px',
        opacity: stage >= 3 ? 1 : 0, transform: stage >= 3 ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        marginBottom: '20px'
      }}>
        BUILT BY <span style={{ color: '#F8FAFC', fontWeight: 700 }}>YASHWANTH S N</span>
      </div>

      <button
        onClick={onReset}
        style={{
          background: 'rgba(0, 242, 254, 0.2)', border: '1px solid #00F2FE', color: '#00F2FE',
          padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700,
          transition: 'all 0.2s'
        }}
      >
        🔄 Replay 3D Simulation
      </button>
    </div>
  );
}
// 9. EASED APPLE-STYLE CAMERA CONTROLLER
// ==========================================
function EasedCameraDirector({ setHeroVisible, replayKey }: { setHeroVisible: (v: boolean) => void; replayKey: number }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = null;
  }, [replayKey]);

  useFrame((state) => {
    if (!cameraRef.current) return;
    if (startTimeRef.current === null) startTimeRef.current = state.clock.getElapsedTime();
    
    const elapsed = state.clock.getElapsedTime() - startTimeRef.current;

    // Sequence Keyframes with Eased Transitions
    const targetPos = new THREE.Vector3(0, 1, 8);
    const targetLook = new THREE.Vector3(0, 0, 0);

    if (elapsed < 5) {
      // Phase 1: Zoom to Gateway Core
      const progress = easeInOutCubic(Math.min(elapsed / 5, 1));
      targetPos.lerpVectors(new THREE.Vector3(-5, 2, 7), new THREE.Vector3(0, 2, 4.5), progress);
      targetLook.lerpVectors(new THREE.Vector3(-5, 0, 3), new THREE.Vector3(0, 0, 0), progress);
    } else if (elapsed < 12) {
      // Phase 2: Pan across Microservices
      const progress = easeInOutCubic(Math.min((elapsed - 5) / 7, 1));
      targetPos.lerpVectors(new THREE.Vector3(0, 2, 4.5), new THREE.Vector3(3, 2.5, 3), progress);
      targetLook.lerpVectors(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, -3.5), progress);
    } else {
      // Phase 3: Zoom Out to Whole Architecture
      const progress = easeInOutCubic(Math.min((elapsed - 12) / 6, 1));
      targetPos.lerpVectors(new THREE.Vector3(3, 2.5, 3), new THREE.Vector3(0, 7.5, 8.5), progress);
      targetLook.lerpVectors(new THREE.Vector3(1, 0, -3.5), new THREE.Vector3(0, 0, -1), progress);
      if (elapsed > 17) setHeroVisible(true);
    }

    cameraRef.current.position.copy(targetPos);
    cameraRef.current.lookAt(targetLook);
  });

  return <PerspectiveCamera makeDefault ref={cameraRef} fov={45} />;
}

// ==========================================
// MAIN APP EXPORT
// ==========================================
export default function APIGatewayDemo() {
  const [pipelineStep, setPipelineStep] = useState(0);
  const [beamProgress, setBeamProgress] = useState(0);
  const [reqId, setReqId] = useState('#A3F92C');
  const [heroVisible, setHeroVisible] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [packetData, setPacketData] = useState<PacketData>({ method: 'POST', path: '/login', status: '200 OK', auth: 'JWT ✔' });

  // Update Request ID periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).toUpperCase().padStart(6, '0');
      setReqId(randomHex);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Step Timeline Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setPipelineStep((prev) => (prev + 1) % 7);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let frame: number;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - startTime) / 2200;
      setBeamProgress(elapsed % 1);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [pipelineStep]);

  // Interactive Trigger Handler
  const handleTriggerRequest = (method: string, path: string) => {
    setPacketData({ method, path, status: '200 OK', auth: 'JWT ✔' });
    setPipelineStep(0);
  };

  const handleReplay = () => {
    setHeroVisible(false);
    setPipelineStep(0);
    setReplayKey((prev) => prev + 1);
  };

  return (
    <div style={{ width: '100%', height: '100%', background: '#0F1117', overflow: 'hidden', position: 'relative', borderRadius: '16px' }}>
      
      {/* Top Header Overlay */}
      <div style={{
        position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)', zIndex: 10,
        display: 'flex', alignItems: 'center', gap: '14px', padding: '6px 16px',
        background: 'rgba(15, 17, 23, 0.85)', border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '30px', backdropFilter: 'blur(12px)', color: '#F8FAFC',
        fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px'
      }}>
        <div style={{ fontWeight: 700, color: '#00F2FE' }}>Cloud Native API Gateway</div>
        <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.15)' }} />
        <div>Req ID: <span style={{ color: '#00F2FE', fontFamily: 'monospace', fontWeight: 700 }}>{reqId}</span></div>
      </div>

      {/* Interactive Trigger Controls */}
      <InteractiveControls onTriggerRequest={handleTriggerRequest} />

      {/* Grafana Metrics & Pipeline Logs */}
      <GrafanaMetricsPanel reqId={reqId} />
      <PipelineContextLogs currentStep={pipelineStep} reqId={reqId} />

      {/* Staggered Final Hero Screen */}
      <StaggeredHeroEnding visible={heroVisible} onReset={handleReplay} />

      {/* 3D WebGL Scene */}
      <Canvas style={{ width: '100%', height: '100%' }}>
        <color attach="background" args={['#0F1117']} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F2FE" />
        <pointLight position={[-10, -5, -10]} intensity={0.8} color="#0052D4" />

        <EasedCameraDirector setHeroVisible={setHeroVisible} replayKey={replayKey} />

        <Float speed={1} rotationIntensity={0.02} floatIntensity={0.1}>
          {/* India Origin Ping Map */}
          <WorldMapOrigin />

          {/* Working Dynamic Gateway Core */}
          <WorkingGatewayCore isProcessing={pipelineStep > 0 && pipelineStep < 6} />

          {/* Kubernetes Service Pods */}
          <K8sServicePod position={[-3, 0, -3.5]} title="User Service" replicas="3/3" status="Healthy" />
          <K8sServicePod position={[0, 0, -4]} title="AI Service" replicas="2/2" status="Healthy" />
          <K8sServicePod position={[3, 0, -3.5]} title="Notification Service" replicas="2/2" status="Healthy" />

          {/* Pulsing Traffic Lines */}
          <PulsingTrafficLine start={[-5.3, 0.1, 3]} end={[0, 0, 0]} color="#00F2FE" />
          <PulsingTrafficLine start={[0, 0, 0]} end={[-3, 0, -3.5]} color="#0052D4" />
          <PulsingTrafficLine start={[0, 0, 0]} end={[0, 0, -4]} color="#0052D4" />
          <PulsingTrafficLine start={[0, 0, 0]} end={[3, 0, -3.5]} color="#0052D4" />

          {/* Floating Data Packet */}
          {pipelineStep <= 3 ? (
            <NetworkDataPacket start={[-5.3, 0.1, 3]} end={[0, 0, 0]} progress={beamProgress} packetData={packetData} />
          ) : (
            <NetworkDataPacket start={[0, 0, 0]} end={[-3, 0, -3.5]} progress={beamProgress} packetData={packetData} />
          )}
        </Float>
      </Canvas>
    </div>
  );
}
