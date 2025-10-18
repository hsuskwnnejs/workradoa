import React, { useState } from 'react';
import { SettingsDescription, Space, SettingsGrid, JoiStack } from '../../common';
import { useImages } from '../../settings';
import { ImageItem, ImageType, ImageServiceType } from '../../types';
import { WaButton, WaIcon } from '@awesome.me/webawesome/dist/react';

export const UrlAdder: React.FC = () => {
  const [images, setImages] = useImages();
  const [text, setText] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const parseUrls = (input: string) => {
    return input
      .split(/[\s,]+/)
      .map(s => s.trim())
      .filter(Boolean);
  };

  const onAdd = async () => {
    setError(undefined);
    const list = parseUrls(text);
    if (list.length === 0) {
      setError('No URLs found');
      return;
    }

    const existing = new Set(images.map(i => i.id));
    const toAdd: ImageItem[] = [];

    for (const u of list) {
      if (!/^https?:\/\//i.test(u)) continue;
      if (existing.has(u)) continue;

      const item: ImageItem = {
        thumbnail: u,
        preview: u,
        full: u,
        type: ImageType.image,
        source: u,
        service: ImageServiceType.url,
        id: u,
      };
      toAdd.push(item);
      existing.add(u);
    }

    if (toAdd.length === 0) {
      setError('No new valid URLs to add.');
      return;
    }

    setImages([...images, ...toAdd]);
    setText('');
  };

  return (
    <SettingsGrid style={{ gridColumn: '1 / -1' }}>
      <SettingsDescription label="Add image URLs">
        Paste one or more image URLs (http/https), separated by spaces or commas.
      </SettingsDescription>

      <JoiStack direction="column">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="https://example.com/image.jpg"
          style={{ width: '100%', minHeight: 90, padding: 8, borderRadius: 6, border: '1px solid rgba(0,0,0,0.1)' }}
        />
        <Space size="small" />
        <div style={{ display: 'flex', gap: 8 }}>
          <WaButton onClick={onAdd} aria-label="Add URLs">
            <WaIcon name="plus" /> Add URLs
          </WaButton>
          <WaButton subtle onClick={() => setText('')}>
            Clear
          </WaButton>
        </div>
        {error && <div style={{ color: 'crimson' }}>{error}</div>}
      </JoiStack>
    </SettingsGrid>
  );
};

export default UrlAdder;
