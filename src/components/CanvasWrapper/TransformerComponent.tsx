import React, { useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';

interface TransformerComponentProps {
  selectedShapeName: string;
}

const TransformerComponent: React.FC<TransformerComponentProps> = ({
  selectedShapeName,
}) => {
  const transformerRef = useRef<any>(null);

  useEffect(() => {
    checkNode();
  });

  const checkNode = () => {
    if (!transformerRef.current) return;

    const stage = transformerRef.current.getStage();
    const selectedNode = stage.findOne('.' + selectedShapeName);

    if (selectedNode === transformerRef.current.node()) {
      return;
    }

    if (selectedNode) {
      transformerRef.current.attachTo(selectedNode);
    } else {
      transformerRef.current.detach();
    }

    transformerRef.current.getLayer().batchDraw();
  };

  return (
    <Transformer
      ref={transformerRef}
      rotateEnabled={false}
      draggable={false}
      enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
      borderStrokeWidth={4}
      onTransform={(e) => {
        transformerRef.current.stopTransform();
      }}
    />
  );
};

export default TransformerComponent;
