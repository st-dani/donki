'use client';

import { useEffect, useRef } from 'react';
import { contactInfo } from '@/types/contact';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const position = new window.kakao.maps.LatLng(37.5666805, 126.9784147);
        const options = {
          center: position,
          level: 3
        };
        const map = new window.kakao.maps.Map(mapRef.current, options);
        const marker = new window.kakao.maps.Marker({
          position: position
        });
        marker.setMap(map);

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${contactInfo.address}</div>`
        });
        infowindow.open(map, marker);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
} 