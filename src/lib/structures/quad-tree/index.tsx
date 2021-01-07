import Vector2 from '../vector2';
import Size from '../size';

interface Neighbors<T> {
  topLeft?: T;
  topRight?: T;
  bottomLeft?: T;
  bottomRight?: T;
}

class QuadTree {
  readonly position: Vector2;
  readonly size: Size;
  readonly neighbors: Neighbors<QuadTree>;

  constructor(position: Vector2, size: Size) {
    this.position = position;
    this.size = size;
    this.neighbors = {};
  }

  public subdivide() {
    const halfSize: Size = {
      width: this.size.width / 2,
      height: this.size.height / 2,
    };

    // Determing neighboring origins
    const topLeftPoint: Vector2 = this.position;
    const topMiddlePoint: Vector2 = {
      x: this.position.x + halfSize.width,
      y: this.position.y,
    };
    const middleLeftPoint: Vector2 = {
      x: this.position.x,
      y: this.position.y + halfSize.height,
    };
    const centerPoint: Vector2 = {
      x: this.position.x + halfSize.width,
      y: this.position.y + halfSize.height,
    };

    // Create neighboring trees
    this.neighbors.topLeft = new QuadTree(topLeftPoint, halfSize);
    this.neighbors.topRight = new QuadTree(topMiddlePoint, halfSize);
    this.neighbors.bottomLeft = new QuadTree(middleLeftPoint, halfSize);
    this.neighbors.bottomRight = new QuadTree(centerPoint, halfSize);
  }

  // Returns true if this tree contains the given point, false otherwise
  public contains(point: Vector2): boolean {
    return (
      point.x >= this.position.x &&
      point.x <= this.position.x + this.size.width &&
      point.y >= this.position.y &&
      point.y <= this.position.y + this.size.height
    );
  }

  // Returns the smallest tree containing the given point
  public smallestBoundingTree(point: Vector2): QuadTree | undefined {
    if (this.neighbors.topLeft?.contains(point))
      return this.neighbors.topLeft.smallestBoundingTree(point);

    if (this.neighbors.topRight?.contains(point))
      return this.neighbors.topRight.smallestBoundingTree(point);

    if (this.neighbors.bottomLeft?.contains(point))
      return this.neighbors.bottomLeft.smallestBoundingTree(point);

    if (this.neighbors.bottomRight?.contains(point))
      return this.neighbors.bottomRight.smallestBoundingTree(point);

    return this.contains(point) ? this : undefined;
  }

  // Returns the size of the smallest tree containing the given point
  public smallestBoundingSize(point: Vector2): Size | undefined {
    const boundingTree = this.smallestBoundingTree(point);
    return boundingTree ? boundingTree.size : undefined;
  }
}

export default QuadTree;