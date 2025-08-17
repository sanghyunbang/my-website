import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;          // 카드 제목 (한글)
  imgUrl?: string;        // 외부 이미지 URL
  description: ReactNode; // 설명 (한글)
  tags?: string[];        // 뱃지
};

// 이미지는 자유롭게 바꿀예정
const FeatureList: FeatureItem[] = [
  {
    title: '사용자 경험 중심 프런트엔드',
    imgUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
    description: (
      <>
        React와 Flutter로 반응형·접근성·애니메이션을 갖춘
        <b> 매끄러운 인터페이스</b>를 만듭니다.
      </>
    ),
    tags: ['Frontend', 'UX'],
  },
];

function FeatureCard({title, imgUrl, description, tags}: FeatureItem) {
  // a 태그 제거 → 클릭해도 이동하지 않도록 display-only
  return (
    <div className={clsx('col col--4', styles.cardCol)}>
      <div className={styles.card} role="article" aria-label={title}>
        {imgUrl && (
          <div className={styles.thumbWrap}>
            <img src={imgUrl} alt={title} className={styles.thumb} loading="lazy" />
          </div>
        )}
        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.desc}>{description}</p>
          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((t) => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className="row">
          {FeatureList.map((item, idx) => (
            <FeatureCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
